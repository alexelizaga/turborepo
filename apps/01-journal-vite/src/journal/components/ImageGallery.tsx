import { ImageList, ImageListItem } from '@mui/material';


export const ImageGallery = ({ images }: any) => {
  return (
    <ImageList sx={{ width: '100%', height: 500 }} cols={4} rowHeight={200}>
      { images?.map((image: string) => (
        <ImageListItem key={image}>
          <img
            src={image}
            srcSet={image}
            alt="Note picture"
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
