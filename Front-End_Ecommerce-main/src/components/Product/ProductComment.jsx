import React, { useState, useEffect, useRef } from 'react';
import {
  Star,
  Heart,
  MessageSquare,
  Camera,
  XCircle,
  User,
  ThumbsUp,
  Send,
  Smile,
  Image as ImageIcon,
  MoreVertical,
  Flag,
  Edit3,
  Trash2
} from 'lucide-react';

const ProductComment = ({ productId }) => {
  const [comments, setComments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [filterRating, setFilterRating] = useState(0);
  const [sortBy, setSortBy] = useState('newest');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [commentImages, setCommentImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchComments();
    fetchStats();

    // Simulate realtime updates
    const interval = setInterval(() => {
      // In real app, this would be WebSocket or Server-Sent Events
      // For now, we'll just simulate occasional new comments
      if (Math.random() < 0.1) { // 10% chance every 5 seconds
        addSimulatedComment();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [productId]);

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchComments = async () => {
    try {
      // Mock data - replace with real API call
      const mockComments = [
        {
          id: 1,
          user_name: 'Nguyễn Văn A',
          user_avatar: 'https://via.placeholder.com/40x40',
          rating: 5,
          comment: 'Sản phẩm rất tốt, chất lượng cao, giao hàng nhanh. Rất hài lòng với dịch vụ!',
          images: ['https://via.placeholder.com/200x200', 'https://via.placeholder.com/200x200'],
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
          like_count: 12,
          is_liked: false,
          is_verified: true
        },
        {
          id: 2,
          user_name: 'Trần Thị B',
          user_avatar: 'https://via.placeholder.com/40x40',
          rating: 4,
          comment: 'Sản phẩm tốt, đúng như mô tả. Chỉ có một chút nhỏ về bao bì nhưng không ảnh hưởng chất lượng.',
          images: ['https://via.placeholder.com/200x200'],
          created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
          like_count: 8,
          is_liked: true,
          is_verified: false
        },
        {
          id: 3,
          user_name: 'Lê Văn C',
          user_avatar: 'https://via.placeholder.com/40x40',
          rating: 5,
          comment: 'Tuyệt vời! Đóng gói cẩn thận, sản phẩm chất lượng tốt. Sẽ mua lại lần sau.',
          images: [],
          created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
          like_count: 15,
          is_liked: false,
          is_verified: true
        }
      ];

      setComments(mockComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Mock stats - replace with real API call
      const mockStats = {
        average_rating: 4.6,
        total_reviews: 128,
        five_star: 45,
        four_star: 38,
        three_star: 25,
        two_star: 15,
        one_star: 5
      };

      setStats(mockStats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const addSimulatedComment = () => {
    const newComment = {
      id: Date.now(),
      user_name: 'Người dùng mới',
      user_avatar: 'https://via.placeholder.com/40x40',
      rating: Math.floor(Math.random() * 5) + 1,
      comment: 'Vừa mới mua, sản phẩm rất tốt!',
      images: [],
      created_at: new Date().toISOString(),
      like_count: 0,
      is_liked: false,
      is_verified: false
    };

    setComments(prev => [newComment, ...prev]);
  };

  const handleLikeComment = async (commentId) => {
    try {
      // Mock like - replace with real API call
      setComments(comments.map(comment =>
        comment.id === commentId
          ? {
            ...comment,
            is_liked: !comment.is_liked,
            like_count: comment.is_liked ? comment.like_count - 1 : comment.like_count + 1
          }
          : comment
      ));
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const handleSubmitComment = async () => {
    if (newRating === 0) {
      alert('Vui lòng chọn số sao đánh giá');
      return;
    }

    if (!newComment.trim()) {
      alert('Vui lòng nhập nhận xét');
      return;
    }

    setIsSubmitting(true);
    try {
      // Mock submit - replace with real API call
      const comment = {
        id: Date.now(),
        user_name: 'Bạn',
        user_avatar: 'https://via.placeholder.com/40x40',
        rating: newRating,
        comment: newComment,
        images: commentImages.map(img => img.url),
        created_at: new Date().toISOString(),
        like_count: 0,
        is_liked: false,
        is_verified: false
      };

      setComments(prev => [comment, ...prev]);
      setNewComment('');
      setNewRating(0);
      setCommentImages([]);
      setShowCommentForm(false);

      // Update stats
      if (stats) {
        setStats({
          ...stats,
          total_reviews: stats.total_reviews + 1,
          [`${newRating === 5 ? 'five' : newRating === 4 ? 'four' : newRating === 3 ? 'three' : newRating === 2 ? 'two' : 'one'}_star`]: stats[`${newRating === 5 ? 'five' : newRating === 4 ? 'four' : newRating === 3 ? 'three' : newRating === 2 ? 'two' : 'one'}_star`] + 1
        });
      }

      alert('Đánh giá đã được gửi thành công!');
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Có lỗi xảy ra khi gửi đánh giá');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      file: file
    }));
    setCommentImages([...commentImages, ...newImages]);
  };

  const removeImage = (imageId) => {
    setCommentImages(commentImages.filter(img => img.id !== imageId));
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={interactive ? () => onRatingChange(star) : undefined}
            className={`text-lg transition-colors ${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
              }`}
          >
            <Star
              className={`w-5 h-5 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const getRatingPercentage = (count) => {
    if (!stats || stats.total_reviews === 0) return 0;
    return (count / stats.total_reviews) * 100;
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Vừa xong';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
  };

  const filteredComments = comments.filter(comment =>
    filterRating === 0 || comment.rating === filterRating
  );

  const sortedComments = [...filteredComments].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.created_at) - new Date(a.created_at);
      case 'oldest':
        return new Date(a.created_at) - new Date(b.created_at);
      case 'rating_high':
        return b.rating - a.rating;
      case 'rating_low':
        return a.rating - b.rating;
      case 'most_liked':
        return b.like_count - a.like_count;
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
        <p className="text-gray-500">Đang tải đánh giá...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">Đánh giá sản phẩm</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-700 rounded-full animate-pulse"></div>
            <span>Realtime</span>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {stats && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {stats.average_rating.toFixed(1)}
              </div>
              <div className="mb-2">
                {renderStars(Math.round(stats.average_rating))}
              </div>
              <p className="text-gray-600">Dựa trên {stats.total_reviews} đánh giá</p>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = stats[`${star === 5 ? 'five' : star === 4 ? 'four' : star === 3 ? 'three' : star === 2 ? 'two' : 'one'}_star`];
                const percentage = getRatingPercentage(count);

                return (
                  <div key={star} className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600 w-8">{star} sao</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Filters and Sort */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Filter by Rating */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Lọc:</span>
            <div className="flex space-x-1">
              <button
                onClick={() => setFilterRating(0)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${filterRating === 0
                  ? 'bg-red-700 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                Tất cả
              </button>
              {[5, 4, 3, 2, 1].map((star) => (
                <button
                  key={star}
                  onClick={() => setFilterRating(star)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${filterRating === star
                    ? 'bg-red-700 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {star} sao
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="newest">Mới nhất</option>
              <option value="oldest">Cũ nhất</option>
              <option value="rating_high">Đánh giá cao</option>
              <option value="rating_low">Đánh giá thấp</option>
              <option value="most_liked">Nhiều lượt thích</option>
            </select>
          </div>
        </div>
      </div>

      {/* Write Comment Button */}
      <div className="px-6 py-4 border-b border-gray-200">
        <button
          onClick={() => setShowCommentForm(true)}
          className="flex items-center space-x-2 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Viết đánh giá</span>
        </button>
      </div>

      {/* Comments List */}
      <div className="max-h-96 overflow-y-auto">
        {sortedComments.length === 0 ? (
          <div className="text-center py-8">
            <Smile className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">Chưa có đánh giá nào</h4>
            <p className="text-gray-500">Hãy là người đầu tiên đánh giá sản phẩm này</p>
          </div>
        ) : (
          <div className="px-6 py-4 space-y-6">
            {sortedComments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <img
                      src={comment.user_avatar}
                      alt={comment.user_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {comment.is_verified && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <Star className="w-2 h-2 text-white fill-current" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{comment.user_name}</h4>
                        <div className="flex items-center space-x-2">
                          {renderStars(comment.rating)}
                          <span className="text-sm text-gray-500">
                            {formatTimeAgo(comment.created_at)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleLikeComment(comment.id)}
                          className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm transition-colors ${comment.is_liked
                            ? 'bg-red-100 text-red-600'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                          <ThumbsUp className="w-4 h-4" />
                          <span>{comment.like_count}</span>
                        </button>

                        <div className="relative group">
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                              <Flag className="w-4 h-4" />
                              <span>Báo cáo</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-3">{comment.comment}</p>

                    {comment.images && comment.images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                        {comment.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Review ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => {
                              // Open image in modal or lightbox
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Comment Form Modal */}
      {showCommentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Viết đánh giá</h3>
                <button
                  onClick={() => setShowCommentForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Đánh giá của bạn *
                </label>
                {renderStars(newRating, true, setNewRating)}
                <p className="text-sm text-gray-500 mt-1">
                  {newRating === 0 && 'Chọn số sao để đánh giá'}
                  {newRating === 1 && 'Rất không hài lòng'}
                  {newRating === 2 && 'Không hài lòng'}
                  {newRating === 3 && 'Bình thường'}
                  {newRating === 4 && 'Hài lòng'}
                  {newRating === 5 && 'Rất hài lòng'}
                </p>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nhận xét của bạn
                </label>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hình ảnh (tối đa 5 ảnh)
                </label>
                <div className="space-y-4">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Camera className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Thêm hình ảnh</p>
                      </div>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {commentImages.length > 0 && (
                    <div className="grid grid-cols-5 gap-2">
                      {commentImages.map((image) => (
                        <div key={image.id} className="relative">
                          <img
                            src={image.url}
                            alt="Review"
                            className="w-full h-20 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeImage(image.id)}
                            className="absolute -top-2 -right-2 bg-red-700 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowCommentForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSubmitComment}
                  disabled={newRating === 0 || !newComment.trim() || isSubmitting}
                  className="px-6 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Đang gửi...' : 'Gửi đánh giá'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductComment;

