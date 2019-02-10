var top250 = {
  init: function(){
    this.$section = $('#top250')
    this.isloading = false
    this.isFinish = false
    this.index = 0
    this.bind()
    this.start()
  },
  bind: function(){
    var _this = this
    this.$section.scroll(function(){
      if(!(_this.isFinish) && _this.isToBottom()){
        _this.start()
      }
    })
  },
  start: function(){
    var _this = this
    this.getData(function(data){
      _this.render(data)
    })
  },
  getData: function(callback){
    var _this = this 
    if(_this.isloading) return
    _this.isloading = true;
    _this.$section.find('.loading').show();
    $.ajax({
    url: 'https://api.douban.com/v2/movie/top250',
    type: 'get',
    data: {
      start: _this.index,
      count: 20
    },
    dataType: 'jsonp',
    contentType: "application/xml; charset=utf-8"
    }).done(function(ret){
      //console.log(ret)
      if(_this.index >= ret.total){
        _this.isFinish = true
      }
      _this.index += 20
      callback&&callback(ret)
    }).fail(function(){
      console.log('数据错误')
    }).always(function(){
      _this.isloading = false
      _this.$section.find('.loading').hide();
    })
  },
  render: function(data){
    var _this = this
    data.subjects.forEach(function(movie){
      var html = `<div class="item">
          <a href="">
            <div class="cover">
              <img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
            </div>
            <div class="detail">
              <h2>肖申克的救赎</h2>
              <div class="extra"><span class="score">9.3</span> / <span class='collect'>1000</span>收藏</div>
              <div class="extra"><span class='year'>1994</span> /  <span class='genres'>剧情、爱情</span></div>
              <div class="extra">导演： <span class='directors'>张艺谋</span></div>
              <div class="extra">主演： <span class='actor'>张艺谋、张艺谋、张艺谋</span></div>
            </div>
          </a>
        </div>`
      var $node = $(html)
      $node.find('.cover img').attr('src', 'https://images.weserv.nl/?url=' + movie.images.small)
      $node.find('.detail h2').text(movie.title)
      $node.find('.detail .score').text(movie.rating.average)
      $node.find('.detail .collect').text(movie.collect_count)
      $node.find('.detail .year').text(movie.year)
      $node.find('.detail .genres').text(movie.genres.join('、'))
      $node.find('.detail .directors').text(function(){
        var arr = []
        movie.directors.forEach(function(item){
          arr.push(item.name)
        })
        return arr.join('、')
      })
      $node.find('.detail .actor').text(function(){
        var arr = []
        movie.casts.forEach(function(item){
          arr.push(item.name)
        })
        return arr.join('、')
      })
      _this.$section.find('.container').append($node)
    })
  },
  isToBottom: function(){
    return this.$section.find('.container').height() -10 <= this.$section.height() + this.$section.scrollTop()
  }
}

var north_us = {
  init: function(){
    this.$section = $('#us')
    this.start()
  },
  start: function(){
    var _this = this
    this.getData(function(data){
      _this.render(data)
    })
  },
  getData: function(callback){
    var _this = this 
    _this.$section.find('.loading').show();
    $.ajax({
    url: 'https://api.douban.com/v2/movie/us_box',
    type: 'get',
    dataType: 'jsonp',
    contentType: "application/xml; charset=utf-8"
    }).done(function(ret){
      console.log(ret)
      callback&&callback(ret)
    }).fail(function(){
      console.log('数据错误')
    }).always(function(){
      _this.$section.find('.loading').hide();
    })
  },
  render: function(data){
    var _this = this
    data.subjects.forEach(function(movie){
      movie = movie.subject
      var html = `<div class="item">
          <a href="">
            <div class="cover">
              <img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
            </div>
            <div class="detail">
              <h2>肖申克的救赎</h2>
              <div class="extra"><span class="score">9.3</span> / <span class='collect'>1000</span>收藏</div>
              <div class="extra"><span class='year'>1994</span> /  <span class='genres'>剧情、爱情</span></div>
              <div class="extra">导演： <span class='directors'>张艺谋</span></div>
              <div class="extra">主演： <span class='actor'>张艺谋、张艺谋、张艺谋</span></div>
            </div>
          </a>
        </div>`
      var $node = $(html)
      $node.find('.cover img').attr('src', 'https://images.weserv.nl/?url=' + movie.images.small)
      $node.find('.detail h2').text(movie.title)
      $node.find('.detail .score').text(movie.rating.average)
      $node.find('.detail .collect').text(movie.collect_count)
      $node.find('.detail .year').text(movie.year)
      $node.find('.detail .genres').text(movie.genres.join('、'))
      $node.find('.detail .directors').text(function(){
        var arr = []
        movie.directors.forEach(function(item){
          arr.push(item.name)
        })
        return arr.join('、')
      })
      $node.find('.detail .actor').text(function(){
        var arr = []
        movie.casts.forEach(function(item){
          arr.push(item.name)
        })
        return arr.join('、')
      })
      _this.$section.find('.container').append($node)
    })
  }
}

var search = {
  init: function(){
    this.$section = $('#search')
    this.keyword = ''
    this.bind()
  },
  bind: function(){
    var _this = this
    this.$section.find('.button').on('click', function(){
      _this.$section.find('.container').empty()
      _this.keyword = _this.$section.find('input').val()
      _this.start()
    })
  },
  start: function(){
    var _this = this
    this.getData(function(data){
      _this.render(data)
    })
  },
  getData: function(callback){
    var _this = this 
    _this.$section.find('.loading').show();
    $.ajax({
    url: 'https://api.douban.com/v2/movie/search',
    type: 'get',
    data: {
      q: _this.keyword
    },
    dataType: 'jsonp'
    }).done(function(ret){
      console.log(ret)
      callback&&callback(ret)
    }).fail(function(){
      console.log('数据错误')
    }).always(function(){
      _this.$section.find('.loading').hide();
    })
  },
  render: function(data){
    var _this = this
    data.subjects.forEach(function(movie){
      var html = `<div class="item">
          <a href="">
            <div class="cover">
              <img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
            </div>
            <div class="detail">
              <h2>肖申克的救赎</h2>
              <div class="extra"><span class="score">9.3</span> / <span class='collect'>1000</span>收藏</div>
              <div class="extra"><span class='year'>1994</span> /  <span class='genres'>剧情、爱情</span></div>
              <div class="extra">导演： <span class='directors'>张艺谋</span></div>
              <div class="extra">主演： <span class='actor'>张艺谋、张艺谋、张艺谋</span></div>
            </div>
          </a>
        </div>`
      var $node = $(html)
      $node.find('.cover img').attr('src', 'https://images.weserv.nl/?url=' + movie.images.small)
      $node.find('.detail h2').text(movie.title)
      $node.find('.detail .score').text(movie.rating.average)
      $node.find('.detail .collect').text(movie.collect_count)
      $node.find('.detail .year').text(movie.year)
      $node.find('.detail .genres').text(movie.genres.join('、'))
      $node.find('.detail .directors').text(function(){
        var arr = []
        movie.directors.forEach(function(item){
          arr.push(item.name)
        })
        return arr.join('、')
      })
      $node.find('.detail .actor').text(function(){
        var arr = []
        movie.casts.forEach(function(item){
          arr.push(item.name)
        })
        return arr.join('、')
      })
      _this.$section.find('.container').append($node)
    })

  }
}

var app = {
  init: function(){
    this.$tab = $('footer>div')
    this.$panel = $('section')
    this.bind()
    top250.init()
    north_us.init()
    search.init()
  },
  bind: function(){
    var _this = this
    this.$tab.on('click', function(){
      $(this).addClass('active').siblings().removeClass('active')
      _this.$panel.eq($(this).index()).fadeIn().siblings().hide()
    })
  }
}

app.init()
