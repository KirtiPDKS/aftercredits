const mongoose = require("mongoose");

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const MovieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  release_year: Number,
  description: String,
  director: String,
  image: String,
});

// We use the Schema to create the Movie model. Models are classes which we can
// use to construct entries in our Database.
const Movie = mongoose.model("Movie", MovieSchema);

// These lines will create a test movie every time the server starts.
// You can delete this once you are creating your own movies.
const dateTimeString = new Date().toLocaleString("en-GB");
new Movie({title: `Princess Mononoke`, genre: `Fantasy epic`, release_year: 1997, description: `Princess Mononoke is a Japanese animated fantasy epic written and directed by Hayao Miyazaki and produced by Studio Ghibli. The film follows Ashitaka, a young prince caught in a conflict between industrial humans and the spirits of the forest, including the fierce San. It is celebrated for its environmental themes, moral complexity, and sweeping animation.`, director: `Hayao Miyazaki`, image: `https://upload.wikimedia.org/wikipedia/en/6/60/Princess_Mononoke_Japanese_poster.png` }).save();

new Movie ({ title: `Good Will Hunting`, genre: `Drama`, release_year: 1997, description: `Good Will Hunting is a drama directed by Gus Van Sant starring Matt Damon as a self-taught mathematical genius working as a janitor at MIT. After assaulting a police officer, he must attend therapy sessions with psychologist Sean Maguire, played by Robin Williams. The film explores trauma, identity, and untapped potential, and won Academy Awards for Best Supporting Actor and Best Original Screenplay.`, director: `Gus Van Sant`, image: `https://upload.wikimedia.org/wikipedia/en/5/52/Good_Will_Hunting.png` }).save();

new Movie ({ title: `Perchance`, genre: `Indie drama`, release_year: 2024, description: `Perchance is an independent drama following two strangers who form an unlikely connection over a single night in a quiet coastal town. As conversations unfold, hidden regrets and unrealized dreams surface, forcing both to confront the paths they’ve chosen. The film is noted for its intimate performances and minimalist storytelling.`, director: `Ava Laurent`, image: `https://www.imdb.com/title/tt5858744/mediaviewer/rm355937024/?ref_=tt_ov_i` }).save();

new Movie ({ title: `Inception`, genre: `Sci-fi thriller`, release_year: 2010, description: `Inception is a science-fiction thriller directed by Christopher Nolan starring Leonardo DiCaprio as Dom Cobb, a skilled thief who steals secrets from within dreams. He is offered a chance at redemption if he can successfully perform inception — planting an idea into someone’s subconscious. The film is known for its layered dream worlds and practical effects.`, director: `Christopher Nolan`, image: `https://upload.wikimedia.org/wikipedia/en/7/7f/Inception_ver3.jpg` }).save();

new Movie ({ title: `The Dark Knight`, genre: `Superhero crime drama`, release_year: 2008, description: `The Dark Knight is a superhero crime drama directed by Christopher Nolan starring Christian Bale as Batman and Heath Ledger as the Joker. Batman faces his greatest psychological and moral challenge as the Joker unleashes chaos on Gotham City. The film is widely praised for Ledger’s iconic performance and its grounded, gritty tone.`, director: `Christopher Nolan`, image: `https://upload.wikimedia.org/wikipedia/en/8/8a/Dark_Knight.jpg` }).save();

new Movie ({ title: `Parasite`, genre: `Thriller drama`, release_year: 2019, description: `Parasite is a South Korean thriller directed by Bong Joon-ho starring Song Kang-ho. The film follows a struggling family who cleverly infiltrate the lives of a wealthy household, leading to unexpected and explosive consequences. It became the first non-English language film to win the Academy Award for Best Picture.`, director: `Bong Joon-ho`, image: `https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png` }).save();

new Movie ({ title: `Interstellar`, genre: `Sci-fi epic`, release_year: 2014, description: `Interstellar is a science-fiction epic directed by Christopher Nolan starring Matthew McConaughey as a former NASA pilot tasked with finding a new habitable planet for humanity. Traveling through a wormhole near Saturn, the crew face extreme time dilation and emotional sacrifice. The film is noted for its scientific accuracy and Hans Zimmer’s score.`, director: `Christopher Nolan`, image: `https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg` }).save();

new Movie ({ title: `The Social Network`, genre: `Biographical drama`, release_year: 2010, description: `The Social Network is a biographical drama directed by David Fincher starring Jesse Eisenberg as Mark Zuckerberg. The film chronicles the creation of Facebook and the legal battles that followed. It is known for Aaron Sorkin’s sharp screenplay and its exploration of ambition and betrayal.`, director: `David Fincher`, image: `https://upload.wikimedia.org/wikipedia/en/8/8c/The_Social_Network_film_poster.png` }).save();

new Movie ({ title: `Get Out`, genre: `Horror thriller`, release_year: 2017, description: `Get Out is a horror thriller directed by Jordan Peele starring Daniel Kaluuya as a young man visiting his girlfriend’s family estate. What begins as awkward social tension escalates into something far more sinister. The film blends social commentary with psychological horror and won the Academy Award for Best Original Screenplay.`, director: `Jordan Peele`, image: `https://upload.wikimedia.org/wikipedia/en/a/a3/Get_Out_poster.png` }).save();

new Movie ({ title: `Whiplash`, genre: `Drama`, release_year: 2014, description: `Whiplash is a drama directed by Damien Chazelle starring Miles Teller as an ambitious jazz drummer and J.K. Simmons as his ruthless instructor. The intense mentor-student dynamic pushes both characters to extremes in pursuit of greatness. The film is acclaimed for its editing and Simmons’ Oscar-winning performance.`, director: `Damien Chazelle`, image: `https://upload.wikimedia.org/wikipedia/en/0/01/Whiplash_poster.jpg` }).save();

new Movie ({ title: `The Grand Budapest Hotel`, genre: `Comedy drama`, release_year: 2014, description: `The Grand Budapest Hotel is a comedy drama directed by Wes Anderson starring Ralph Fiennes as Monsieur Gustave, a legendary concierge accused of murder. The film follows a whimsical European caper involving stolen art and family fortune. It is celebrated for its visual symmetry and distinctive style.`, director: `Wes Anderson`, image: `https://upload.wikimedia.org/wikipedia/en/a/a6/The_Grand_Budapest_Hotel_Poster.jpg` }).save();

new Movie ({ title: `Mad Max: Fury Road`, genre: `Post-apocalyptic action`, release_year: 2015, description: `Mad Max: Fury Road is a post-apocalyptic action film directed by George Miller starring Tom Hardy and Charlize Theron. Set in a desert wasteland, the film follows a high-speed escape from a tyrannical warlord. It is renowned for its practical stunts and relentless pacing.`, director: `George Miller`, image: `https://upload.wikimedia.org/wikipedia/en/2/23/Mad_Max_Fury_Road.jpg` }).save();

new Movie ({ title: `La La Land`, genre: `Romantic musical drama`, release_year: 2016, description: `La La Land is a romantic musical drama directed by Damien Chazelle starring Ryan Gosling and Emma Stone. The film follows two aspiring artists navigating love and ambition in Los Angeles. It is known for its vibrant cinematography and modern take on classic Hollywood musicals.`, director: `Damien Chazelle`, image: `https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29.png` }).save();

new Movie ({ title: `The Matrix`, genre: `Sci-fi action`, release_year: 1999, description: `The Matrix is a science-fiction action film directed by the Wachowskis starring Keanu Reeves as Neo, a hacker who discovers reality is a simulated construct. He joins a rebellion against intelligent machines controlling humanity. The film revolutionized action cinema with its bullet-time visual effects.`, director: `The Wachowskis`, image: `https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg` }).save();

new Movie ({ title: `Joker`, genre: `Psychological drama`, release_year: 2019, description: `Joker is a psychological drama directed by Todd Phillips starring Joaquin Phoenix as Arthur Fleck, a struggling comedian descending into madness. The film explores themes of isolation and societal neglect. Phoenix won the Academy Award for Best Actor for his performance.`, director: `Todd Phillips`, image: `https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg` }).save();

new Movie ({ title: `The Shawshank Redemption`, genre: `Drama`, release_year: 1994, description: `The Shawshank Redemption is a drama directed by Frank Darabont starring Tim Robbins and Morgan Freeman. The film follows the enduring friendship between two imprisoned men over several decades. It is widely regarded as one of the greatest films ever made.`, director: `Frank Darabont`, image: `https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg` }).save();

new Movie ({ title: `Gladiator`, genre: `Historical epic`, release_year: 2000, description: `Gladiator is a historical epic directed by Ridley Scott starring Russell Crowe as a betrayed Roman general seeking vengeance. Forced into slavery, he rises as a gladiator in the Colosseum. The film won the Academy Award for Best Picture.`, director: `Ridley Scott`, image: `https://upload.wikimedia.org/wikipedia/en/8/8d/Gladiator_ver1.jpg` }).save();

new Movie ({ title: `Black Panther`, genre: `Superhero action`, release_year: 2018, description: `Black Panther is a superhero action film directed by Ryan Coogler starring Chadwick Boseman as T’Challa, king of Wakanda. He must defend his throne from a powerful challenger with global ambitions. The film was praised for its cultural impact and world-building.`, director: `Ryan Coogler`, image: `https://upload.wikimedia.org/wikipedia/en/d/d6/Black_Panther_%28film%29_poster.jpg` }).save();

new Movie ({ title: `The Lord of the Rings: The Fellowship of the Ring`, genre: `Fantasy adventure`, release_year: 2001, description: `The Fellowship of the Ring is a fantasy adventure directed by Peter Jackson starring Elijah Wood as Frodo Baggins. Frodo embarks on a perilous journey to destroy a powerful ring that threatens Middle-earth. The film launched an acclaimed trilogy based on J.R.R. Tolkien’s novels.`, director: `Peter Jackson`, image: `https://upload.wikimedia.org/wikipedia/en/8/87/Ringstrilogyposter.jpg` }).save();

new Movie ({ title: `The Silence of the Lambs`, genre: `Psychological thriller`, release_year: 1991, description: `The Silence of the Lambs is a psychological thriller directed by Jonathan Demme starring Jodie Foster and Anthony Hopkins. An FBI trainee seeks help from imprisoned cannibal Hannibal Lecter to catch another serial killer. The film won five major Academy Awards including Best Picture.`, director: `Jonathan Demme`, image: `https://upload.wikimedia.org/wikipedia/en/8/86/The_Silence_of_the_Lambs_poster.jpg` }).save();

new Movie ({ title: `Avengers: Endgame`, genre: `Superhero epic`, release_year: 2019, description: `Avengers: Endgame is a superhero epic directed by Anthony and Joe Russo starring Robert Downey Jr. and Chris Evans. The surviving Avengers attempt to reverse the devastation caused by Thanos. The film became one of the highest-grossing films of all time.`, director: `Anthony and Joe Russo`, image: `https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg` }).save();

new Movie ({ title: `Fight Club`, genre: `Psychological drama`, release_year: 1999, description: `Fight Club is a psychological drama directed by David Fincher starring Edward Norton and Brad Pitt. An insomniac office worker forms an underground fight club that spirals into anarchic rebellion. The film gained cult status for its provocative themes.`, director: `David Fincher`, image: `https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg` }).save();

new Movie ({ title: `Titanic`, genre: `Romantic epic`, release_year: 1997, description: `Titanic is a romantic epic directed by James Cameron starring Leonardo DiCaprio and Kate Winslet. The film tells the tragic love story of two passengers aboard the ill-fated RMS Titanic. It became one of the most successful films in cinematic history.`, director: `James Cameron`, image: `https://upload.wikimedia.org/wikipedia/en/2/22/Titanic_poster.jpg` }).save();

module.exports = Movie;
