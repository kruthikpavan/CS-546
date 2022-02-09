const dogs = require('./dogs');
const posts = require('./posts');
const connection = require('./mongoConnection');

const main = async () => {
  let sasha = undefined;
  let max = undefined;
  let porkChop = undefined;
  let maxPost = undefined;
  let porkChopPost = undefined;
  let sashaPost = undefined;

  try {
    sasha = await dogs.addDog('Sasha', ['Cheagle', 'Chihuaha', 'Beagle']);
    console.log('Sasha the dog has been added, now she will blog!');
    console.log(sasha);
  } catch (e) {
    console.log(e);
  }

  try {
    max = await dogs.addDog('Max', ['Mastiff']);
    console.log('Max the dog has been added, now she will blog!');
    console.log(max);
  } catch (e) {
    console.log(e);
  }

  try {
    porkChop = await dogs.addDog('Pork Chop', ['Golden Retriever', 'Labrador']);
    console.log('Pork Chop the dog has been added, now she will blog!');
    console.log(porkChop);
  } catch (e) {
    console.log(e);
  }

  try {
    maxPost = await posts.addPost(
      'The Case of the Stolen Bone',
      "It was 2015 when it happened. Someone stole the bone, and hid it in a hole outside. It's a good thing that I hide all my bones in holes outside, or I would have never found. I then realized that, all along, it was me who hid the bone.",
      max._id.toString()
    );
  } catch (e) {
    console.log(e);
  }

  try {
    porkChopPost = await posts.addPost(
      'Who Am I?',
      "They call me Pork Chop. I don't like Pork! I only eat Turkey! I DON'T KNOW WHO I AM!",
      porkChop._id.toString()
    );
  } catch (e) {
    console.log(e);
  }

  try {
    sashaPost = await posts.addPost(
      "A Review of Bleu d'Auvergne",
      "It was 2014 when I was born, and it was 2014 when I received my first taste of Bleu d'Auvergne. I dined upon the delicacy at the home of my grand-papa, known as The Cheese Man for the great varieties of cheese he kept in his abode. I still do not know if the Bleu d'Auvergne was what ignited my love of cheese, or if it was the strange diet of my papa whom kept away from the starches and sugars and replaced them with cheeses and legumes. But truly, I will never forget the strange world of the first taste of Bleu d'Auvergne, to this day the greatest cheese I have ever tasted. It paired very nicely with the cheeseburger I stole from my papa's four year old cousin. No one believed him. It was the perfect crime.",
      sasha._id.toString()
    );
  } catch (e) {
    console.log(e);
  }

  console.log("Let's change the title of Sasha's post...");

  try {
    const updatedPost = await posts.updatePost(
      sashaPost._id.toString(),
      "For Love of Bleu d'Auvergne",
      sashaPost.body,
      sashaPost.poster.id
    );
    console.log('Now, the post is:');
    console.log(updatedPost);
  } catch (e) {
    console.log(e);
  }

  try {
    let deleted = await posts.removePost(maxPost._id.toString());
    console.log(deleted);
  } catch (e) {
    console.log(e);
  }

  console.log("Let's update a dog");

  try {
    const updatedSashasName = await dogs.updateDog(
      sasha._id.toString(),
      'Dharma',
      ['Husky', 'American Eskimo']
    );
    console.log("Now Sasha's name is:");
    console.log(updatedSashasName);
  } catch (e) {
    console.log(e);
  }

  console.log("Let's now delete poor Max");

  try {
    const deleted = await dogs.removeDog(max._id.toString());
    console.log(deleted);
  } catch (e) {
    console.log(e);
  }

  const db = await connection.connectToDb();
  await connection.closeConnection();
  console.log('Done!');
};

main().catch((error) => {
  console.log(error);
});
