import HTTP from '../utils/http';

class LikeModel extends HTTP {
  like(behavior, artId, category) {
    const url = behavior === 'like' ? 'like' : 'like/cancel';
    this.request({
      url,
      method: 'POST',
      data: {
        art_id: artId,
        type: category,
      },
    });
  }

  likeInfo(id, type, success) {
    this.request({
      url: `classic/${type}/${id}/favor`,
      success,
    });
  }
}

export default LikeModel;
