var allArticles = [];

function Article (opts) {
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
}

Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone().removeClass('template');

  $newArticle.attr('data-category', this.category);
  $newArticle.attr('data-author', this.author);

  $newArticle.find('.byline a').text(this.author);
  $newArticle.find('.byline a').attr('href', this.authorUrl);
  $newArticle.find('h1:first').text(this.title);
  $newArticle.find('.article-body').html(this.body);
  $newArticle.find('time[pubdate]').attr('datetime', this.publishedOn);
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn);
  $newArticle.find('time').text('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  return $newArticle;
};

sourceData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

sourceData.forEach(function(ele) {
  allArticles.push(new Article(ele));
});

allArticles.forEach(function(a){
  $('#articles').append(a.toHtml());
});
