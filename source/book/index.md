---
title: 书籍
date: 2024-07-01 00:00:00
type: "book"
orderby: random
order: 1
---

<div class="bookshelf">
  <h2>我的书架</h2>
  <div class="book-grid">
    {% for category in site.data.book %}
    {% if category.link_list and category.link_list.length > 0 %}
    <div class="book-category">
      <h3>{{ category.class_name }}</h3>
      <div class="book-list">
        {% for book in category.link_list %}
        <a href="{{ book.link }}" target="_blank" rel="noopener noreferrer" class="book-link">
          <div class="book-item">
            <div class="book-cover">
              <img src="{{ book.cover }}" alt="{{ book.name }}">
            </div>
            <div class="book-info">
              <h4 title="{{ book.name }}">{{ book.name }}</h4>
              <p class="author" title="{{ book.author }}">{{ book.author }}</p>
            </div>
          </div>
        </a>
        {% endfor %}
      </div>
    </div>
    {% endif %}
    {% endfor %}
  </div>
</div>

<style>
.bookshelf {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.book-grid {
  display: grid;
  gap: 40px;
  margin-top: 30px;
}

.book-category h3 {
  color: #2c3e50;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.book-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.book-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.book-item {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
}

.book-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.book-cover {
  width: 100%;
  padding: 8px 8px 0;
  text-align: center;
  background: #f8f9fa;
}

.book-cover img {
  width: auto;
  height: 160px;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  object-fit: cover;
}

.book-info {
  padding: 12px;
  text-align: center;
  background: #fff;
}

.book-info h4 {
  margin: 0;
  color: #34495e;
  font-size: 0.95em;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-height: 2.8em;
}

.book-info .author {
  color: #7f8c8d;
  font-size: 0.85em;
  margin: 8px 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 1200px) {
  .book-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .book-list {
    grid-template-columns: repeat(2, 1fr);
  }
  .book-cover img {
    height: 180px;
  }
}

@media (max-width: 600px) {
  .book-list {
    grid-template-columns: 1fr;
  }
  .book-cover img {
    height: 200px;
  }
}
</style>
