const Listing=require("../models/listing");
const Review=require("../models/review");

module.exports.createReview = async(req,res)=>{
    let listing =await Listing.findById(req.params.id);
    let newReview =new Review(req.body.review);
    newReview.author= req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success","New Review Created!");
    res.redirect(`/listings/${listing._id}`)
};

module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;

    // Remove the review from the listing's reviews array
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    // Delete the review document itself
    await Review.findByIdAndDelete(reviewId);

    // Flash success message
    req.flash("success", "Review Deleted!");

    // Redirect to the listing page
    res.redirect(`/listings/${id}`);
};
