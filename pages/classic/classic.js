import ClassicModel from '../../models/classic';
import LikeModel from '../../models/like';

const classicModel = new ClassicModel();
const likeModel = new LikeModel();

Page({
  data: {
    classic: null,
    first: false,
    latest: true,
    likecount: 0,
    likeState: false,
  },
  onLoad() {
    classicModel.getLatest((res) => {
      this.setData({
        classic: res,
        likeCount: res.fav_nums,
        likeState: res.like_status,
      });
    });
  },
  onLike(event) {
    const { behavior } = event.detail;
    this.getLike(behavior);
  },
  onNext() {
    this.getClassic('next');
  },
  onPrevious() {
    this.getClassic('previous');
  },
  getLike(behavior) {
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type);
  },
  getClassic(nextOrPrevious) {
    const { index } = this.data.classic;
    console.log(index);
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this.getLikeInfo(res.id, res.type);
      this.setData({
        classic: res,
        first: classicModel.isFirst(res.index),
        latest: classicModel.isLatest(res.index),
      });
    });
  },
  getLikeInfo(artId, category) {
    likeModel.likeInfo(artId, category, (res) => {
      this.setData({
        likeCount: res.fav_nums,
        likeState: res.like_status,
      });
    });
  },
});
