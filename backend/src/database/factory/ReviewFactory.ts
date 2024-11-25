import { setSeederFactory } from "typeorm-extension";
import { Reviews } from "../../entities/ReviewsEntity";
import { faker } from "@faker-js/faker";

export const ReviewsFactory = setSeederFactory(Reviews, () => {
	const review = new Reviews();
	review.description = faker.lorem.paragraph();
	review.raiting = faker.number.int({min: 1, max: 5});
	return review;
}); 
