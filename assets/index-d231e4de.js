import{i as y,b as h,n as w,d as m,f as l,j as T,k as I,s as q,u as E,p as _,l as D,v as A,m as P}from"./index-855b8cd4.js";function v(a){return!!y(a.id)}function C(a){const e=y(a);if(!e)throw new Error(`No injected provider found for wallet: "${a}"`);return e}async function b(a,e,c){const n=C(a),r=(await n.request({method:"eth_requestAccounts"}))[0];if(!r)throw new Error("no accounts available");const t=h(r),s=await n.request({method:"eth_chainId"}).then(w);let o=e.chain&&e.chain.id===s?e.chain:m(s);return e.chain&&e.chain.id!==s&&(await p(n,e.chain),o=e.chain),g(n,t,o,c)}async function H(a,e,c){const n=C(a),r=(await n.request({method:"eth_accounts"}))[0];if(!r)throw new Error("no accounts available");const t=h(r),s=await n.request({method:"eth_chainId"}).then(w),o=c&&c.id===s?c:m(s);return g(n,t,o,e)}function f(a,e){const c={address:h(e),async sendTransaction(n){return{transactionHash:await a.request({method:"eth_sendTransaction",params:[{accessList:n.accessList,value:n.value?l(n.value):void 0,gas:n.gas?l(n.gas):void 0,from:this.address,to:n.to,data:n.data}]})}},async signMessage({message:n}){if(!c.address)throw new Error("Provider not setup");const i=(()=>typeof n=="string"?q(n):n.raw instanceof Uint8Array?E(n.raw):n.raw)();return await a.request({method:"personal_sign",params:[i,c.address]})},async signTypedData(n){if(!a||!c.address)throw new Error("Provider not setup");const i=_(n),{domain:r,message:t,primaryType:s}=i,o={EIP712Domain:D({domain:r}),...i.types};A({domain:r,message:t,primaryType:s,types:o});const d=P({domain:r??{},message:t,primaryType:s,types:o});return await a.request({method:"eth_signTypedData_v4",params:[c.address,d]})},async watchAsset(n){return await a.request({method:"wallet_watchAsset",params:n},{retryCount:0})}};return c}async function g(a,e,c,n){const i=f(a,e);async function r(){a.removeListener("accountsChanged",s),a.removeListener("chainChanged",o),a.removeListener("disconnect",t)}async function t(){r(),n.emit("disconnect",void 0)}function s(d){if(d[0]){const u=f(a,h(d[0]));n.emit("accountChanged",u),n.emit("accountsChanged",d)}else t()}function o(d){const u=m(w(d));n.emit("chainChanged",u)}return a.on&&(a.on("accountsChanged",s),a.on("chainChanged",o),a.on("disconnect",t)),[i,c,t,d=>p(a,d)]}async function p(a,e){var n,i,r;const c=l(e.id);try{await a.request({method:"wallet_switchEthereumChain",params:[{chainId:c}]})}catch(t){if((t==null?void 0:t.code)===4902||((i=(n=t==null?void 0:t.data)==null?void 0:n.originalError)==null?void 0:i.code)===4902){const s=await T(e);await a.request({method:"wallet_addEthereumChain",params:[{chainId:c,chainName:s.name,nativeCurrency:s.nativeCurrency,rpcUrls:I(s),blockExplorerUrls:(r=s.explorers)==null?void 0:r.map(o=>o.url)}]})}else throw t}}export{H as autoConnectInjectedWallet,b as connectInjectedWallet,C as getInjectedProvider,v as isInjectedWallet};
