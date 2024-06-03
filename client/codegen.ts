import codegen from '@cosmwasm/ts-codegen';

codegen({
  contracts: [
    {
      name: 'Dinonum',
      dir: '../contracts/dinonum/artifacts/schema'
    },
  ],
  outPath: './types',

  // options are completely optional ;)
  options: {
    
    types: {
      enabled: true
    },
    messageComposer: {
      enabled: true
    },
    client: {
        enabled: true
      },
   
  }
}).then(() => {
  console.log('✨ all done!');
});