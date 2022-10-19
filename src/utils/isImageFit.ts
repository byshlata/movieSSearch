export const isImageFit = (
  heightImg: number,
  width: number,
  indexHeightWidth: number,
): boolean => heightImg - indexHeightWidth < width;
