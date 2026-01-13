import React from 'react'
import FeedbackEmpty from './FeedbackEmpty'
import FeedbackList from './FeedbackList'
import useReview from '@/hooks/useReview'
import { Spinner } from '@/components/ui/spinner'

const Feedback = ({ productId }) => {
    const { GetReviewByID } = useReview(productId)


    if (GetReviewByID?.isLoading) return <Spinner />
    const feedbacks = GetReviewByID?.data;

    return (
        <>
            {feedbacks.length === 0 ? <FeedbackEmpty /> : <FeedbackList feedbacks={feedbacks} />}
        </>
    )

}

export default Feedback