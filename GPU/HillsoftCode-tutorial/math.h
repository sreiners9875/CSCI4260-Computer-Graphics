#ifndef MATHS_H
#define MATHS_H

inline float sqr(float n)
{
    return n * n;
}

struct Vector
{
    float x, y, z;

    Vector();
    Vector(const Vector &v);
    Vector(float x, float y, float z);
    Vector(float f);

    virtual ~Vector();

    inline float length2();
    inline float length();

    float normalize();
    Vector normalized();

    Vector &operator=(const Vector &v);
    Vector &operator+=(const Vector &v);
    Vector &operator-=(const Vector &v);
    Vector &operator*=(float f);
    Vector &operator/=(float f);
    Vector operator-() const;
};

float dot(Vector v1, Vector v2);
Vector cross(Vector v1, Vector v2);

inline Vector operator+(const Vector &v1, const Vector &v2)
{
    return Vector(v1.x + v2.x,
                  v1.y + v2.y,
                  v1.z + v2.z);
}

#endif