import React, { useRef, useState } from 'react';
import {
  Container,
  ImageIndexs,
  ImageIndex,
  CardImageWrapper,
  CarImage,
} from './styles';
import { FlatList, ViewToken } from 'react-native';

interface Props {
  imageUrl: string[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}
export function ImageSlider({ imageUrl }: Props) {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  return (
    <Container>
      <ImageIndexs>
        {imageUrl.map((_, index) => (
          <ImageIndex key={String(index)} active={index === imageIndex} />
        ))}
      </ImageIndexs>

      <CardImageWrapper>
        <FlatList
          data={imageUrl}
          keyExtractor={(key) => key}
          renderItem={({ item }) => (
            <CardImageWrapper>
              <CarImage source={{ uri: item }} resizeMode="contain" />
            </CardImageWrapper>
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={indexChanged.current}
        />
      </CardImageWrapper>
    </Container>
  );
}
