---
title: 人物
date: 2024-08-01 00:00:00
type: "people"
orderby: random
order: 1
---

<div class="people">
  <h2>人物介绍</h2>
  <div class="people-grid">
    {% for person in site.data.people.link_list %}
    <div class="person-card">
      <div class="card-front">
        <img src="{{ person.avatar }}" alt="{{ person.name }}" class="avatar">
        <div class="card-content">
          <div class="name">{{ person.name }}</div>
          <div class="desc">{{ person.desc }}</div>
        </div>
      </div>
      <div class="card-back">
        <img src="{{ person.avatar }}" alt="{{ person.name }}" class="avatar">
        <div class="quote">“{{ person.quote }}”</div>
      </div>
    </div>
    {% endfor %}
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.person-card');
  cards.forEach(card => {
    card.addEventListener('click', function() {
      card.classList.toggle('is-flipped');
    });
  });
});
</script>

<style>
.people {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.people-grid {
  display: grid;
  grid-row-gap: 50px; 
  grid-column-gap: 30px; /* Increased horizontal gap for more space between columns */
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  margin-top: 30px;
}

.person-card {
  perspective: 1000px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s;
  cursor: pointer;
  width: 100%;
  height: 200px;
  overflow: visible; /* Allow elements to overflow the card boundary */
}

.person-card.is-flipped .card-front {
  transform: rotateY(180deg);
}

.person-card.is-flipped .card-back {
  transform: rotateY(0deg);
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.card-front {
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  padding: 20px;
  min-width: 350px;
  justify-content: flex-start;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
}

.avatar {
  width: 80px; /* Reduced size for smaller avatar */
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  margin-right: 25px; /* Increased margin for more space between avatar and text */
  flex-basis: 80px;
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  flex-basis: calc(100% - 95px);
}

.name {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: center;
}

.desc {
  font-size: 1em;
  text-align: center;
  color: #666;
}

.card-back {
  background-color: #eaeaea;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: visible;
}

.card-back .avatar {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.quote {
  font-size: 1.2em;
  text-align: center;
  color: #333;
  margin-top: 10px; /* Reduced margin to bring text closer to the avatar */
}
</style>
