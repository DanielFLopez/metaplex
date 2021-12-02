import { Col, Row, Layout } from 'antd';
import React, {useState} from 'react';
import Masonry from 'react-masonry-css';
import { FireballCard } from '../../components/FireballCard';
import { FireballCardMint } from '../../components/FireballCardMint';
import {dummyData} from './data'
import {ArtworkViewState} from "../artworks";
import {useCreatorArts, useUserArts} from "../../hooks";
import {useMeta} from "@oyster/common";
import {useWallet} from "@solana/wallet-adapter-react";

const { Content } = Layout;

export const FireballView = () => {
  const { publicKey } = useWallet();
  const ownedMetadata = useUserArts();
  const createdMetadata = useCreatorArts(publicKey?.toBase58() || '');
  const { metadata } = useMeta();
  const [activeKey] = useState(ArtworkViewState.Owned);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  // real own ntfs
  const items =
    activeKey === ArtworkViewState.Owned
      ? ownedMetadata.map(m => m.metadata)
      : activeKey === ArtworkViewState.Created
      ? createdMetadata
      : metadata;


  const cardGrid = (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid fireball-masonry"
      columnClassName="my-masonry-grid_column"
    >
      {dummyData.map((m, id) => {
        return (
          <FireballCard
              key={id}
              pubkey={m.pubkey}
              name={m.name}
              image={m.image}
              preview={false}
              height={250}
              width={250}
              artView
              dummy={true}
          />
        );
      })}
    </Masonry>
  );

  const collectorGrid = (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid fireball-masonry"
      columnClassName="my-masonry-grid_column"
    >
      {dummyData.map((m, id) => {
        return (
          <FireballCardMint
              key={id}
              pubkey={m.pubkey}
              name={m.name}
              image={m.image}
              preview={false}
              height={250}
              width={250}
              artView
              dummy={true}
          />
        );
      })}
    </Masonry>
  );

  return (
    <Layout style={{ margin: 0, marginTop: 30}}>
      <p className={"text-title"}>Collector NFTs</p>
      <p className={"text-subtitle"}>You can burn 13 NFTs to redeem an exclusive NFT. You don’t have enough right now.</p>
      <Content style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Col style={{ width: '100%', marginTop: 10}}>{collectorGrid}</Col>
      </Content>
      <div className={"row"}>
        <p className={"text-title"}>Your NFTs</p>
        <div className={"unlock-nft"}> <p className={"unlock-text"}>3/13 NFTs unlocked</p></div>
      </div>
      <p className={"text-subtitle"}>The NFTs you have collected so far.</p>
      <br/>
      <Content style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Col style={{ width: '100%', marginTop: 10}}>{cardGrid}</Col>
      </Content>
    </Layout>
  );
};
