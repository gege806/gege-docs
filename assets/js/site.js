(function () {
  if (!document.body.classList.contains('home') && !document.querySelector('.wrap.home')) return
  var article = document.querySelector('.paper')
  if (!article) return
  var input = document.createElement('input')
  input.className = 'search'
  input.placeholder = '搜索插件…'
  var h1 = article.querySelector('h1')
  if (h1 && h1.nextSibling) article.insertBefore(input, h1.nextSibling.nextSibling || h1.nextSibling)
  else article.insertBefore(input, article.firstChild)

  input.addEventListener('input', function () {
    var q = input.value.trim().toLowerCase()
    article.querySelectorAll('h2, ul').forEach(function (el) {
      if (el.tagName === 'H2') return
    })
    article.querySelectorAll('ul').forEach(function (ul) {
      var vis = 0
      ul.querySelectorAll('li').forEach(function (li) {
        var ok = !q || li.textContent.toLowerCase().indexOf(q) >= 0
        li.classList.toggle('hidden', !ok)
        if (ok) vis++
      })
      var h2 = ul.previousElementSibling
      if (h2 && h2.tagName === 'H2') h2.classList.toggle('hidden', vis === 0)
    })
  })
})()
