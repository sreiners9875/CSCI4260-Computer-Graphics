
import java.awt.Color;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;

public class starter {

  public static void main(String[] args) {

    try {

      BufferedImage bufferedImage = ImageIO.read(new File("bridge.jpg"));

      // To create an image from scratch, use the following
      // BufferedImage bufferedImage = new BufferedImage(200, 200,
      // BufferedImage.TYPE_INT_ARGB);


      //Loop over every pixel
      for (int y = 0; y < bufferedImage.getHeight(); y++) {
        for (int x = 0; x < bufferedImage.getWidth(); x++) {
          int pixelInt = bufferedImage.getRGB(x, y);
          Color pixelColor = new Color(pixelInt);

          //Just do a grayscale conversion for half the image
          if (x < bufferedImage.getWidth() / 2) {
            //Get the int [0,255] values for red, green, and blue
            int r = pixelColor.getRed();
            int g = pixelColor.getGreen();
            int b = pixelColor.getBlue();

            //Do a trivial grayscale conversion by just using the red channel.
            g = r;
            b = r;

            //Create a new color object with the new colors
            Color outColor = new Color(r, g, b);

            //Set the pixel to the color
            bufferedImage.setRGB(x, y, outColor.getRGB());
          }
        }
      }

      //Draw a red rectangle on the image

      //Get the graphics context
      Graphics g = bufferedImage.getGraphics();

      //Draw the rectangle
      g.setColor(Color.RED);
      g.drawRect(10, 10, 100, 100);

      // Save the image to a file
      ImageIO.write(bufferedImage, "PNG", new File("out.png"));

    } catch (IOException ex) {
      ex.printStackTrace();
    }
  }
}