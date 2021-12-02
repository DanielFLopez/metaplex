import React from 'react';
import {Card} from 'antd';
import {useArt} from "../../hooks";
import {ArtType} from "../../types";
import {ArtCardProps} from "../ArtCard";
import {ArtContent} from "../ArtContent";


export interface NFT {
  name: string;
  image: string;
}

interface DummyArtCardProps extends ArtCardProps{
   dummy?: boolean;
}

export const FireballCard = (props: DummyArtCardProps) => {
  let {
    className,
    small,
    category,
    image,
    animationURL,
    name,
    preview,
    pubkey,
    height,
    artView,
    width,
    dummy,
    ...rest
  } = props;
  const art = useArt(pubkey);
  name = art?.title || name || ' ';

  return (
    <Card
      hoverable={true}
      className={`fireball-card ${small ? 'small' : ''} ${className ?? ''}`}
      cover={
        <div className="image-container">
          { dummy ? <img src={image} alt="dummyImage" />
            : <ArtContent
            pubkey={pubkey}
            uri={image}
            animationURL={animationURL}
            category={category}
            preview={preview}
            height={height}
            width={width}
            artView={artView}
            style={{border: "15px"}}
          /> }
        </div>
      }
      bordered={false}
     {...rest}
    >
      <div>
        <p className={"card-title"}>The collector</p>
        <p className={"card-name"}>{name}</p>
      </div>
    </Card>
  );
};
