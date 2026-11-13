// My Gallery：カテゴリーで作品を絞り込む
const buttons = document.querySelectorAll('.c-category-filter[data-filter]');
const cards = document.querySelectorAll('.p-gallery__list > [data-category]');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
    cards.forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});
