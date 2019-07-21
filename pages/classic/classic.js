import ClassicModel from '../../models/classic';
import LikeModel from '../../models/like';

const classicModel = new ClassicModel();
const likeModel = new LikeModel();

Page({
  data: {
    classic: null,
    first: false,
    latest: true,
  },
  onLoad() {
    classicModel.getLatest((res) => {
      this.setData({
        classic: res,
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
      this.setData({
        classic: res,
        first: classicModel.isFirst(res.index),
        latest: classicModel.isLatest(res.index),
      });
    });
  },
});
