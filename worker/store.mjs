export function sqliteStore(storage){
  let depth=0;
  return {exec:query=>storage.sql.exec(query),prepare:query=>({get:(...args)=>storage.sql.exec(query,...args).toArray()[0],all:(...args)=>storage.sql.exec(query,...args).toArray(),run:(...args)=>{storage.sql.exec(query,...args);return {changes:storage.sql.exec('SELECT changes() AS n').one().n};}}),transaction:fn=>{if(depth)return fn();depth++;try{return storage.transactionSync(fn);}finally{depth--;}}};
}
