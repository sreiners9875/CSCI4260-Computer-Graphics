#ifndef IMAGE_H
#define IMAGE_H

#include <string>

class Image
{
protected:
    int width, height;
    float *data;

public:
    Image(int width, int height);

    virtual ~Image();

    int getWidth() const;
    int getHeight() const;

    float *getPixel(int x, int y);

    void saveIMage(std::string filename) const;
};

#endif