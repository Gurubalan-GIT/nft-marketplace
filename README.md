# NFT Marketplace

This is a Web 3.0 NFT Marketplace application on the Rinkeby ETH, built on NextJS, Sanity IO, Tailwind CSS, Alchemy and Thirdweb.

## Live

### ⚡️ [Production](https://gbh-nft-marketplace.vercel.app/)

## How to use

```
npm i
npm run dev
```

## Sanity Schema

```
    [
      {
        name: "users",
        title: "Users",
        type: "document",
        fields: [
          {
            name: "userName",
            title: "User Name",
            type: "string",
          },
          {
            name: "walletAddress",
            title: "Wallet Address",
            type: "string",
          },
          {
            name: "profileImage",
            title: "Profile Image",
            type: "image",
          },
          {
            name: "bannerImage",
            title: "Banner Image",
            type: "image",
          },
          {
            name: "twitterHandle",
            title: "Twitter Handle",
            type: "string",
          },
          {
            name: "igHandle",
            title: "Instagram Handle",
            type: "string",
          },
        ],
      },
      {
        name: "admins",
        title: "Admins",
        type: "document",
        fields: [
          {
            name: "userName",
            title: "User Name",
            type: "string",
          },
          {
            name: "walletAddress",
            title: "Wallet Address",
            type: "string",
          },
          {
            name: "profileImage",
            title: "Profile Image",
            type: "image",
          },
        ],
      },
      {
        name: "transactions",
        title: "NFT Transactions",
        type: "document",
        fields: [
          {
            name: "price",
            title: "Price",
            type: "number",
            validation: (Rule) => Rule.min(0),
          },
          {
            name: "sellerContractAddress",
            title: "Seller Contract Address",
            type: "string",
          },
          {
            name: "buyerContractAddress",
            title: "Buyer Contract Address",
            type: "string",
          },
          {
            name: "marketPlaceContractAddress",
            title: "Marketplace Contract Address",
            type: "string",
          },
          {
            name: "nftId",
            title: "NFT ID",
            type: "number",
            validation: (Rule) => Rule.min(0),
          },
        ],
      },
      {
        name: "marketItems",
        title: "Market Items",
        type: "document",
        fields: [
          {
            name: "title",
            title: "Title",
            type: "string",
          },
          {
            name: "contractAddress",
            title: "Contract Address",
            type: "string",
          },
          {
            name: "description",
            title: "Description",
            type: "string",
          },
          {
            name: "createdBy",
            title: "Created By",
            type: "reference",
            to: [{ type: "admins" }],
          },
          {
            name: "volumeTraded",
            title: "Volume Traded",
            type: "number",
          },
          {
            name: "owners",
            title: "Owners",
            type: "array",
            of: [{ type: "reference", to: [{ type: "users" }] }],
          },
          {
            name: "profileImage",
            title: "Profile Image",
            type: "image",
          },
          {
            name: "bannerImage",
            title: "Banner Image",
            type: "image",
          },
        ],
      },
    ]
```

## Configuring your data-feeds

- Check the file [localization.js](/localization.js) for URLs being used.
- For Sanity, please modify the sanity [client](/lib/sanity-client.js) with your details.
- Login into [ThirdWeb](https://thirdweb.com/) and create a NFT marketplace and a collection to go with minted NFTs. You would get the contract addresses of them after this.
