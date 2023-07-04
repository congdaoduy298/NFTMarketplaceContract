/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export declare namespace Auction {
  export type AuctionInfoStruct = {
    auctioneer: PromiseOrValue<string>;
    _tokenId: PromiseOrValue<BigNumberish>;
    initialPrice: PromiseOrValue<BigNumberish>;
    lastBid: PromiseOrValue<BigNumberish>;
    lastBidder: PromiseOrValue<string>;
    startTime: PromiseOrValue<BigNumberish>;
    endTime: PromiseOrValue<BigNumberish>;
    completed: PromiseOrValue<boolean>;
    auctionId: PromiseOrValue<BigNumberish>;
  };

  export type AuctionInfoStructOutput = [
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    BigNumber,
    BigNumber,
    boolean,
    BigNumber
  ] & {
    auctioneer: string;
    _tokenId: BigNumber;
    initialPrice: BigNumber;
    lastBid: BigNumber;
    lastBidder: string;
    startTime: BigNumber;
    endTime: BigNumber;
    completed: boolean;
    auctionId: BigNumber;
  };
}

export interface AuctionInterface extends utils.Interface {
  functions: {
    "AUCTION_SERVICE_FEE_RATE()": FunctionFragment;
    "MINIMUM_BID_RATE()": FunctionFragment;
    "cancelAuction(uint256)": FunctionFragment;
    "createAuction(uint256,uint256,uint256,uint256)": FunctionFragment;
    "finishAuction(uint256)": FunctionFragment;
    "getAuction(uint256)": FunctionFragment;
    "getAuctionByStatus(bool)": FunctionFragment;
    "joinAuction(uint256,uint256)": FunctionFragment;
    "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setNFT(address)": FunctionFragment;
    "setTax(uint256)": FunctionFragment;
    "setToken(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "withdrawERC20()": FunctionFragment;
    "withdrawToken(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "AUCTION_SERVICE_FEE_RATE"
      | "MINIMUM_BID_RATE"
      | "cancelAuction"
      | "createAuction"
      | "finishAuction"
      | "getAuction"
      | "getAuctionByStatus"
      | "joinAuction"
      | "onERC721Received"
      | "owner"
      | "renounceOwnership"
      | "setNFT"
      | "setTax"
      | "setToken"
      | "transferOwnership"
      | "withdrawERC20"
      | "withdrawToken"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "AUCTION_SERVICE_FEE_RATE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MINIMUM_BID_RATE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "cancelAuction",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "createAuction",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "finishAuction",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getAuction",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getAuctionByStatus",
    values: [PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "joinAuction",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setNFT",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setTax",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setToken",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawERC20",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawToken",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "AUCTION_SERVICE_FEE_RATE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MINIMUM_BID_RATE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "cancelAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "finishAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getAuction", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getAuctionByStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "joinAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC721Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setNFT", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setTax", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setToken", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawERC20",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawToken",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "SetNFT(address)": EventFragment;
    "SetTax(uint256)": EventFragment;
    "SetToken(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetNFT"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetTax"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetToken"): EventFragment;
}

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface SetNFTEventObject {
  _nft: string;
}
export type SetNFTEvent = TypedEvent<[string], SetNFTEventObject>;

export type SetNFTEventFilter = TypedEventFilter<SetNFTEvent>;

export interface SetTaxEventObject {
  tax: BigNumber;
}
export type SetTaxEvent = TypedEvent<[BigNumber], SetTaxEventObject>;

export type SetTaxEventFilter = TypedEventFilter<SetTaxEvent>;

export interface SetTokenEventObject {
  _token: string;
}
export type SetTokenEvent = TypedEvent<[string], SetTokenEventObject>;

export type SetTokenEventFilter = TypedEventFilter<SetTokenEvent>;

export interface Auction extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: AuctionInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    AUCTION_SERVICE_FEE_RATE(overrides?: CallOverrides): Promise<[BigNumber]>;

    MINIMUM_BID_RATE(overrides?: CallOverrides): Promise<[BigNumber]>;

    cancelAuction(
      _auctionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createAuction(
      _tokenId: PromiseOrValue<BigNumberish>,
      _initialPrice: PromiseOrValue<BigNumberish>,
      _startTime: PromiseOrValue<BigNumberish>,
      _endTime: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    finishAuction(
      _auctionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAuction(
      _auctionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[Auction.AuctionInfoStructOutput]>;

    getAuctionByStatus(
      _active: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<[Auction.AuctionInfoStructOutput[]]>;

    joinAuction(
      _auctionId: PromiseOrValue<BigNumberish>,
      _bid: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    onERC721Received(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setNFT(
      _nft: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setTax(
      _tax: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setToken(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawERC20(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawToken(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  AUCTION_SERVICE_FEE_RATE(overrides?: CallOverrides): Promise<BigNumber>;

  MINIMUM_BID_RATE(overrides?: CallOverrides): Promise<BigNumber>;

  cancelAuction(
    _auctionId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createAuction(
    _tokenId: PromiseOrValue<BigNumberish>,
    _initialPrice: PromiseOrValue<BigNumberish>,
    _startTime: PromiseOrValue<BigNumberish>,
    _endTime: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  finishAuction(
    _auctionId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAuction(
    _auctionId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<Auction.AuctionInfoStructOutput>;

  getAuctionByStatus(
    _active: PromiseOrValue<boolean>,
    overrides?: CallOverrides
  ): Promise<Auction.AuctionInfoStructOutput[]>;

  joinAuction(
    _auctionId: PromiseOrValue<BigNumberish>,
    _bid: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  onERC721Received(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<string>,
    arg2: PromiseOrValue<BigNumberish>,
    arg3: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setNFT(
    _nft: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setTax(
    _tax: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setToken(
    _token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawERC20(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawToken(
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    AUCTION_SERVICE_FEE_RATE(overrides?: CallOverrides): Promise<BigNumber>;

    MINIMUM_BID_RATE(overrides?: CallOverrides): Promise<BigNumber>;

    cancelAuction(
      _auctionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    createAuction(
      _tokenId: PromiseOrValue<BigNumberish>,
      _initialPrice: PromiseOrValue<BigNumberish>,
      _startTime: PromiseOrValue<BigNumberish>,
      _endTime: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    finishAuction(
      _auctionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getAuction(
      _auctionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<Auction.AuctionInfoStructOutput>;

    getAuctionByStatus(
      _active: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<Auction.AuctionInfoStructOutput[]>;

    joinAuction(
      _auctionId: PromiseOrValue<BigNumberish>,
      _bid: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    onERC721Received(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setNFT(
      _nft: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setTax(
      _tax: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setToken(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawERC20(overrides?: CallOverrides): Promise<void>;

    withdrawToken(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "SetNFT(address)"(_nft?: null): SetNFTEventFilter;
    SetNFT(_nft?: null): SetNFTEventFilter;

    "SetTax(uint256)"(tax?: null): SetTaxEventFilter;
    SetTax(tax?: null): SetTaxEventFilter;

    "SetToken(address)"(_token?: null): SetTokenEventFilter;
    SetToken(_token?: null): SetTokenEventFilter;
  };

  estimateGas: {
    AUCTION_SERVICE_FEE_RATE(overrides?: CallOverrides): Promise<BigNumber>;

    MINIMUM_BID_RATE(overrides?: CallOverrides): Promise<BigNumber>;

    cancelAuction(
      _auctionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createAuction(
      _tokenId: PromiseOrValue<BigNumberish>,
      _initialPrice: PromiseOrValue<BigNumberish>,
      _startTime: PromiseOrValue<BigNumberish>,
      _endTime: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    finishAuction(
      _auctionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAuction(
      _auctionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAuctionByStatus(
      _active: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    joinAuction(
      _auctionId: PromiseOrValue<BigNumberish>,
      _bid: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    onERC721Received(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setNFT(
      _nft: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setTax(
      _tax: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setToken(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawERC20(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawToken(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    AUCTION_SERVICE_FEE_RATE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    MINIMUM_BID_RATE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    cancelAuction(
      _auctionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createAuction(
      _tokenId: PromiseOrValue<BigNumberish>,
      _initialPrice: PromiseOrValue<BigNumberish>,
      _startTime: PromiseOrValue<BigNumberish>,
      _endTime: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    finishAuction(
      _auctionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAuction(
      _auctionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAuctionByStatus(
      _active: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    joinAuction(
      _auctionId: PromiseOrValue<BigNumberish>,
      _bid: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    onERC721Received(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setNFT(
      _nft: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setTax(
      _tax: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setToken(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawERC20(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawToken(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
