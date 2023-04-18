using System.Drawing;


class Starter
{
  static void Main(string[] args)
  {
    Console.WriteLine("Hello World!");
    Bitmap Img = new Bitmap(Bitmap.FromFile("./bridge.jpg"));

    for (var y = 0; y < Img.Height; y++)
    {
      for (var x = 0; x < Img.Width; x++)
      {
        if (x < Img.Width / 2)
        {
          var Pixel = Img.GetPixel(x, y);
          Color NewPixel = Color.FromArgb(Pixel.R,Pixel.R,Pixel.R);
          Img.SetPixel(x, y, NewPixel);
        }
      }
    }

    using(Graphics g = Graphics.FromImage(Img)){
        g.DrawRectangle(new Pen(Color.Red), 10, 10, 100, 100);
    }


    Img.Save("./out.png");
  }
}
