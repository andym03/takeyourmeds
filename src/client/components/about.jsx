import React from 'react';

import './about.css';

export default function About() {
  return (
    <div>
      <img src="./src/client/images/blog-colour.png" className="left-align-image" />
      <div className="blogBody">
        <div className="fakeJumbotron">
          <img src="./src/client/images/flowers-righthand-corner.png" className="blogImage" />
          <div className="blogHeader">
            <h1> About Us</h1>
          </div>
          <div className="blogAuthorBlock">
            <img src="./src/client/images/me.jpg" className="avatar" />
            <p>Andrew McMenemy<br></br>🌏<i> Sydney Australia</i></p>
          </div>
          
          <p className="blogText blogIntroText">
            Take Your Meds <i>(bitch)</i> is a small corner on the internet made to promote <b>mental wellness. </b>
            It is created and mainted by myself, Andrew McMenemy.
          </p>
        </div>
        <h2> Medication Reminders </h2>
        <p className="blogText">
          The inspiration for this website was to create a device agnostic tool that would remind you 
          to take your medication. After I implemented this however, I quickly realised there wasn't enough
          in this idea to be of use to people. It would also mark the end of this project i've had a lot of fun with.
          Instead, i've expanded medication reminders to be more of a mailing list, and to provide people with the 
          means to brighten their day. From free meditations, curated wholesome memes, and some fresh tunes, I hope
          to create a digital community centered around compassion and love.
        </p>
        <h2> Wholesome Memes </h2>
        <p className="blogText">
          Updated daily, my favourite wholesome meme.
        </p>
        <h2> Discord </h2>
        <div className="discord-block">
          <a href="https://discord.gg/BrCfBCM">
            <img src="./src/client/images/Discord-Logo-White.svg" alt="Discord" className="discord" />
            <h4> Take Your Meds</h4>
          </a>
        </div>
        <p className="blogText">
         
          A place to chat about anything, share your works or vent about the current state of the world. Should not be
          considered a replacement for professional therapy. Please seek Lifeline or call 13 11 14 if you are having
          suicidal thoughts. 
        </p>
        <h2> Animal Crossing Spotlight </h2>
        <p className="blogText">
          A place to host the cutest Animal Crossing screenshot, submitted by the community. Updated weekly.
        </p>
      </div>
    </div>
  );
}
