export class Review {
    constructor(reviewId, userId, comment, date, rating) {
            this.reviewId = reviewId
            this.userId = userId
            this.comment = comment
            this.date = date
            this.rating = rating
    }

    set setReviewId(reviewId) {
        this.reviewId = reviewId
    }

    get getReviewId() {
        return this.ReviewId
    }

    set setUserId(userId) {
        this.userId = userId
    }

    get getUserId() {
        return this.userId
    }

    set setComment(comment) {
        this.comment = comment
    }

    get getCommnet() {
        return this.comment
    }

    set setDate(date) {
        this.date = date
    }

    get getDate() {
        return this.date
    }

    set setRating(rating) {
        this.rating = rating
    }

    get getRating() {
        return this.rating
    }
}