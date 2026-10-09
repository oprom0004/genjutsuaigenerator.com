export const MOTIONS=Object.freeze({'src-hiphop':'/media/src-hiphop.mp4','src-kpop':'/media/src-kpop.mp4'});
export function motionPayload(imageURL,videoURL){
 for(const value of [imageURL,videoURL])if(new URL(value).protocol!=='https:')throw Error('Reference must use HTTPS.');
 return {model:'kling-2.6/motion-control',input:{prompt:'The character performs the movements in the reference video. Preserve the character identity, face, clothing and visual style. One performer, full body, coherent anatomy.',input_urls:[imageURL],video_urls:[videoURL],mode:'720p',character_orientation:'video'}};
}
