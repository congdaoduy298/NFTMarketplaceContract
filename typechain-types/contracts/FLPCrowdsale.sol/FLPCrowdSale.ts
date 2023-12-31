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
  PayableOverrides,
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
} from "../../common";

export interface FLPCrowdSaleInterface extends utils.Interface {
  functions: {
    "BNB_rate()": FunctionFragment;
    "USDT_rate()": FunctionFragment;
    "_wallet()": FunctionFragment;
    "buyTokenByBNB()": FunctionFragment;
    "buyTokenByUSDT(uint256)": FunctionFragment;
    "getTokenAmountBNB(uint256)": FunctionFragment;
    "getTokenAmountUSDT(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setBNBRate(uint256)": FunctionFragment;
    "setUSDTRate(uint256)": FunctionFragment;
    "token()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "usdtToken()": FunctionFragment;
    "withdraw()": FunctionFragment;
    "withdrawErc20()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "BNB_rate"
      | "USDT_rate"
      | "_wallet"
      | "buyTokenByBNB"
      | "buyTokenByUSDT"
      | "getTokenAmountBNB"
      | "getTokenAmountUSDT"
      | "owner"
      | "renounceOwnership"
      | "setBNBRate"
      | "setUSDTRate"
      | "token"
      | "transferOwnership"
      | "usdtToken"
      | "withdraw"
      | "withdrawErc20"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "BNB_rate", values?: undefined): string;
  encodeFunctionData(functionFragment: "USDT_rate", values?: undefined): string;
  encodeFunctionData(functionFragment: "_wallet", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "buyTokenByBNB",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "buyTokenByUSDT",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getTokenAmountBNB",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getTokenAmountUSDT",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setBNBRate",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setUSDTRate",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "usdtToken", values?: undefined): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdrawErc20",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "BNB_rate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "USDT_rate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "_wallet", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "buyTokenByBNB",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "buyTokenByUSDT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTokenAmountBNB",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTokenAmountUSDT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setBNBRate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setUSDTRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "usdtToken", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawErc20",
    data: BytesLike
  ): Result;

  events: {
    "BuyTokenByBNB(address,uint256)": EventFragment;
    "BuyTokenByUSDT(address,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "SetBNBRate(uint256)": EventFragment;
    "SetUSDTRate(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "BuyTokenByBNB"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BuyTokenByUSDT"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetBNBRate"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetUSDTRate"): EventFragment;
}

export interface BuyTokenByBNBEventObject {
  buyer: string;
  amount: BigNumber;
}
export type BuyTokenByBNBEvent = TypedEvent<
  [string, BigNumber],
  BuyTokenByBNBEventObject
>;

export type BuyTokenByBNBEventFilter = TypedEventFilter<BuyTokenByBNBEvent>;

export interface BuyTokenByUSDTEventObject {
  buyer: string;
  amount: BigNumber;
}
export type BuyTokenByUSDTEvent = TypedEvent<
  [string, BigNumber],
  BuyTokenByUSDTEventObject
>;

export type BuyTokenByUSDTEventFilter = TypedEventFilter<BuyTokenByUSDTEvent>;

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

export interface SetBNBRateEventObject {
  newRate: BigNumber;
}
export type SetBNBRateEvent = TypedEvent<[BigNumber], SetBNBRateEventObject>;

export type SetBNBRateEventFilter = TypedEventFilter<SetBNBRateEvent>;

export interface SetUSDTRateEventObject {
  newRate: BigNumber;
}
export type SetUSDTRateEvent = TypedEvent<[BigNumber], SetUSDTRateEventObject>;

export type SetUSDTRateEventFilter = TypedEventFilter<SetUSDTRateEvent>;

export interface FLPCrowdSale extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: FLPCrowdSaleInterface;

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
    BNB_rate(overrides?: CallOverrides): Promise<[BigNumber]>;

    USDT_rate(overrides?: CallOverrides): Promise<[BigNumber]>;

    _wallet(overrides?: CallOverrides): Promise<[string]>;

    buyTokenByBNB(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    buyTokenByUSDT(
      usdtAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getTokenAmountBNB(
      bnbAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getTokenAmountUSDT(
      usdtAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setBNBRate(
      new_rate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setUSDTRate(
      new_rate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    token(overrides?: CallOverrides): Promise<[string]>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    usdtToken(overrides?: CallOverrides): Promise<[string]>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawErc20(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  BNB_rate(overrides?: CallOverrides): Promise<BigNumber>;

  USDT_rate(overrides?: CallOverrides): Promise<BigNumber>;

  _wallet(overrides?: CallOverrides): Promise<string>;

  buyTokenByBNB(
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  buyTokenByUSDT(
    usdtAmount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getTokenAmountBNB(
    bnbAmount: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getTokenAmountUSDT(
    usdtAmount: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setBNBRate(
    new_rate: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setUSDTRate(
    new_rate: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  token(overrides?: CallOverrides): Promise<string>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  usdtToken(overrides?: CallOverrides): Promise<string>;

  withdraw(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawErc20(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    BNB_rate(overrides?: CallOverrides): Promise<BigNumber>;

    USDT_rate(overrides?: CallOverrides): Promise<BigNumber>;

    _wallet(overrides?: CallOverrides): Promise<string>;

    buyTokenByBNB(overrides?: CallOverrides): Promise<void>;

    buyTokenByUSDT(
      usdtAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getTokenAmountBNB(
      bnbAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTokenAmountUSDT(
      usdtAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setBNBRate(
      new_rate: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setUSDTRate(
      new_rate: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    token(overrides?: CallOverrides): Promise<string>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    usdtToken(overrides?: CallOverrides): Promise<string>;

    withdraw(overrides?: CallOverrides): Promise<void>;

    withdrawErc20(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "BuyTokenByBNB(address,uint256)"(
      buyer?: null,
      amount?: null
    ): BuyTokenByBNBEventFilter;
    BuyTokenByBNB(buyer?: null, amount?: null): BuyTokenByBNBEventFilter;

    "BuyTokenByUSDT(address,uint256)"(
      buyer?: null,
      amount?: null
    ): BuyTokenByUSDTEventFilter;
    BuyTokenByUSDT(buyer?: null, amount?: null): BuyTokenByUSDTEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "SetBNBRate(uint256)"(newRate?: null): SetBNBRateEventFilter;
    SetBNBRate(newRate?: null): SetBNBRateEventFilter;

    "SetUSDTRate(uint256)"(newRate?: null): SetUSDTRateEventFilter;
    SetUSDTRate(newRate?: null): SetUSDTRateEventFilter;
  };

  estimateGas: {
    BNB_rate(overrides?: CallOverrides): Promise<BigNumber>;

    USDT_rate(overrides?: CallOverrides): Promise<BigNumber>;

    _wallet(overrides?: CallOverrides): Promise<BigNumber>;

    buyTokenByBNB(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    buyTokenByUSDT(
      usdtAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getTokenAmountBNB(
      bnbAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTokenAmountUSDT(
      usdtAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setBNBRate(
      new_rate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setUSDTRate(
      new_rate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    usdtToken(overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawErc20(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    BNB_rate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    USDT_rate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _wallet(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    buyTokenByBNB(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    buyTokenByUSDT(
      usdtAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getTokenAmountBNB(
      bnbAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTokenAmountUSDT(
      usdtAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setBNBRate(
      new_rate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setUSDTRate(
      new_rate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    usdtToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawErc20(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
