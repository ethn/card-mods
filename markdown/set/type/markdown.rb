format :html do
  view :core do |args|
    Maruku.new(card.content).to_html
  end

  view :editor, :mod=>Type::Html::HtmlFormat
end
