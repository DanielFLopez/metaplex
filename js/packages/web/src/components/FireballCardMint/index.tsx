import React from 'react';
import {ArtCardProps} from "../ArtCard";
import {FireballCard} from "../FireballCard";

interface DummyArtCardProps extends ArtCardProps{
   dummy?: boolean;
}

export const FireballCardMint = (props: DummyArtCardProps) => {
  let {
    key,
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

  return (
    <div>
      <FireballCard
        key={key}
        pubkey={pubkey}
        name={name}
        image={image}
        preview={false}
        height={250}
        width={250}
        artView
        dummy={true}
      />
      <div className={"nft-container"}>
        <div className={"label-quantity"}>
          3/13 NFTs needed to burn
        </div>
        <button className={"mint-button"}>Mint</button>
      </div>
    </div>
  );
};
