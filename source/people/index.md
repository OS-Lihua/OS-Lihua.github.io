---
title: 人物
date: 2024-08-01 00:00:00
type: "people"
orderby: random
order: 1
---

<div class="people">
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
function initPeopleCards() {
  const cards = document.querySelectorAll('.person-card');
  cards.forEach(card => {
    card.addEventListener('click', function(event) {
      event.preventDefault();
      card.classList.toggle('is-flipped');
    });
  });
}

// 在页面加载完成时初始化
document.addEventListener('DOMContentLoaded', initPeopleCards);
// 在pjax加载完成时初始化
document.addEventListener('pjax:complete', initPeopleCards);
// 在pjax:end事件时也初始化（某些主题可能使用这个事件）
document.addEventListener('pjax:end', initPeopleCards);
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
  perspective: 1500px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 1s cubic-bezier(0.4, 0.2, 0.2, 1); /* Slow down the flipping animation */
  cursor: pointer;
  width: 100%;
  height: 200px;
  overflow: visible;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(240, 240, 240, 0.8)), var(--card-color); /* Combine gradient with card color */
  border-radius: 12px; /* Slightly larger radius for softer edges */
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 15px 15px 20px rgba(0, 0, 0, 0.3); /* Make shadow more pronounced and positioned to bottom-right */
  transition: all 0.3s ease;
}

.person-card:hover {
  transform: scale(1.05); /* Slight zoom on hover for interactivity */
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2), 0 30px 60px rgba(0, 0, 0, 0.15); /* Enhance shadow on hover */
}

.person-card.is-flipped {
  transform: rotateY(180deg); /* Rotate the entire card for flipping effect */
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
  transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1); /* Ensure smooth transition for flipping */
}

.card-front {
  background-color: transparent; /* Set transparent to allow parent color to show */
  display: flex;
  align-items: center;
  padding: 20px;
  min-width: 350px;
  justify-content: flex-start;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: none; /* Remove border to avoid unwanted lines */
}

.card-back {
  transform: rotateY(180deg); /* Start with back side rotated */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: visible;
  border: none; /* Remove border to avoid unwanted lines */
  background-color: transparent; /* Set transparent to allow parent color to show */
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

:root {
  --card-color-1: #FFDDC1;
  --card-color-2: #FFE4E1;
  --card-color-3: #FFFACD;
  --card-color-4: #E6E6FA;
  --card-color-5: #D3F8E2;
  --card-color-6: #E0BBE4;
  --card-color-7: #D5AAFF;
  --card-color-8: #C1E1C1;
  --card-color-9: #FFB6C1;
  --card-color-10: #FADADD;
  --card-color-11: #B5EAD7;
  --card-color-12: #C7CEEA;
}

.people-grid .person-card:nth-child(12n+1) { --card-color: var(--card-color-1); }
.people-grid .person-card:nth-child(12n+2) { --card-color: var(--card-color-2); }
.people-grid .person-card:nth-child(12n+3) { --card-color: var(--card-color-3); }
.people-grid .person-card:nth-child(12n+4) { --card-color: var(--card-color-4); }
.people-grid .person-card:nth-child(12n+5) { --card-color: var(--card-color-5); }
.people-grid .person-card:nth-child(12n+6) { --card-color: var(--card-color-6); }
.people-grid .person-card:nth-child(12n+7) { --card-color: var(--card-color-7); }
.people-grid .person-card:nth-child(12n+8) { --card-color: var(--card-color-8); }
.people-grid .person-card:nth-child(12n+9) { --card-color: var(--card-color-9); }
.people-grid .person-card:nth-child(12n+10) { --card-color: var(--card-color-10); }
.people-grid .person-card:nth-child(12n+11) { --card-color: var(--card-color-11); }
.people-grid .person-card:nth-child(12n+0) { --card-color: var(--card-color-12); }
</style>
