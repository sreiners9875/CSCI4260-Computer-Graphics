#include <QtCore/QCoreApplication>

#include "image.h"
#include "camera.h"
#include "shape.h"

void rayTrace(Image &image, Camera *camera, Shape *scene)
{
    for (int x = 0; x < image.getWidth(); x++)
    {
        for (int y = 0; y < image.getHeight(); y++)
        {
            Vector2 screenCoord((2.0f * x) / image.getWidth() - 1.0f,
                                (2.0f * y) / image.getHeight() + 1.0f);
            Ray ray = camera->makeRay(screenCoord);

            float *curPixel = image.getPixel(x, y);

            Intersection intersection(ray);
        }
    }
}