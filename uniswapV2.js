const uniswap = require ("@uniswap/sdk");

const chainId = uniswap.ChainId.MAINNET;
const tokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; // must be checksummed
const decimals = 18;

const DAI = new uniswap.Token(chainId, tokenAddress, decimals);


const USDC = new uniswap.Token(
    uniswap.ChainId.MAINNET,
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",  //USDC 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
    6
  );

// UNI token address 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984

const getTokenWETHPairPrice = async function (token0) {
   const p =  await uniswap.Fetcher.fetchPairData(token0, uniswap.WETH[token0.chainId])
   const route = new uniswap.Route([p], uniswap.WETH[token0.chainId]);
   console.log(route.midPrice.toSignificant(6)); 
   console.log(route.midPrice.invert().toSignificant(6)); 
}

const getPairPrice = async function (token0,token1) {
    const p =  await uniswap.Fetcher.fetchPairData(token0,token1)
    const route = new uniswap.Route([p], token1);
    console.log(route.midPrice.toSignificant(6));
    console.log(route.midPrice.invert().toSignificant(6)); 
}

const swap = async function(amountIn){
    const pair = await uniswap.Fetcher.fetchPairData(DAI, uniswap.WETH[DAI.chainId]);

    const route = new uniswap.Route([pair], uniswap.WETH[DAI.chainId]);

    // amountIn = "1000000000000000000"; // 1 WETH

    const trade = new uniswap.Trade(
        route,
    new TokenAmount(uniswap.WETH[DAI.chainId], amountIn),
    uniswap.TradeType.EXACT_INPUT
);
}


getTokenWETHPairPrice(DAI)

getPairPrice(DAI,USDC)


// console.log(route.midPrice.toSignificant(6)); // 201.306
// console.log(route.midPrice.invert().toSignificant(6)); // 0.00496756