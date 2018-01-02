import MaleArms from './arms/male';
import MaleBody from './body/male';
import MaleBoots from './boots/male';
import MaleHead from './head/male';
import MalePants from './pants/male';
import MaleGloves from './gloves/male';
import UnisexBack from './back/unisex';

export default {
  male: {
    gloves: MaleGloves,
    arms: MaleArms,
    body: MaleBody,
    boots: MaleBoots,
    head: MaleHead,
    pants: MalePants
  },
  unisex: {
    back: UnisexBack
  }
}