const B = 1024;
const KB = B * B;


module.exports = function( size ){
  if( size < B ){
    return size + 'B';
  }
  else if( size < KB ){
    return ( size / B ).toFixed( 2 ) + 'KB';
  }
  else{
    return ( size / KB ).toFixed( 2 ) + 'MB';
  }
}