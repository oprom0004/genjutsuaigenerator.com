import {imageSize} from 'image-size';
import {PhotonImage,resize,SamplingFilter} from '@cf-wasm/photon';
export function normalizeImage(bytes){
  if(!bytes.length||bytes.length>8*1024*1024)throw Error('Choose an image up to 8 MB.');
  const m=imageSize(bytes);
  if(!['jpg','png','webp'].includes(m.type)||!m.width||!m.height||Math.min(m.width,m.height)<320||m.width*m.height>4000000||m.width/m.height<0.4||m.width/m.height>2.5)throw Error('Choose a JPEG, PNG or WebP portrait from 320 pixels up to 4 megapixels.');
  const view=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);
  if(m.type==='png')for(let i=8;i+12<=bytes.length;){const n=view.getUint32(i),kind=String.fromCharCode(...bytes.slice(i+4,i+8));if(kind==='acTL'||i+n+12>bytes.length)throw Error('Choose a still image.');i+=n+12;}
  if(m.type==='webp')for(let i=12;i+8<=bytes.length;){const n=view.getUint32(i+4,true),kind=String.fromCharCode(...bytes.slice(i,i+4));if(['ANIM','ANMF'].includes(kind)||(kind==='VP8X'&&(bytes[i+8]&2))||i+n+8>bytes.length)throw Error('Choose a still image.');i+=8+n+(n%2);}
  const original=PhotonImage.new_from_byteslice(bytes);let scaled,encoded;
  try{
    const orientation=m.orientation||1,swap=orientation>=5&&orientation<=8,scale=Math.min(1600/m.width,1600/m.height,1),w=Math.round(m.width*scale),h=Math.round(m.height*scale);
    scaled=resize(original,w,h,SamplingFilter.Triangle);const raw=scaled.get_raw_pixels(),ow=swap?h:w,oh=swap?w:h,out=new Uint8Array(ow*oh*4);
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){
      let ox=x,oy=y;switch(orientation){case 2:ox=w-1-x;break;case 3:ox=w-1-x;oy=h-1-y;break;case 4:oy=h-1-y;break;case 5:ox=y;oy=x;break;case 6:ox=h-1-y;oy=x;break;case 7:ox=h-1-y;oy=w-1-x;break;case 8:ox=y;oy=w-1-x;break;}
      const a=(y*w+x)*4,b=(oy*ow+ox)*4,alpha=raw[a+3]/255;for(let c=0;c<3;c++)out[b+c]=Math.round(raw[a+c]*alpha+255*(1-alpha));out[b+3]=255;
    }
    encoded=new PhotonImage(out,ow,oh);return encoded.get_bytes_jpeg(90);
  }finally{encoded?.free();scaled?.free();original.free();}
}
