include_set Abstract::Media

format :html do
  # a linked image with a title and subtitle
  view :thumbnail, cache: :yes do
    # voo.show :thumbnail_link
    thumbnail
  end

  view :thumbnail_minimal, cache: :yes do
    voo.hide! :thumbnail_subtitle
    voo.hide! :thumbnail_link
    thumbnail
  end

  view :thumbnail_no_link, cache: :yes do
    voo.hide :thumbnail_link
    thumbnail
  end

  view :thumbnail_no_subtitle, cache: :yes do
    voo.hide :thumbnail_subtitle
    thumbnail
  end

  # just an image
  view :thumbnail_image do
    return unless (image = image_card)

    nest image, view: thumbnail_image_view, size: thumbnail_image_size
  end

  view :thumbnail_subtitle do
    wrap_with :div, class: "thumbnail-subtitle" do
      thumbnail_subtitle
    end
  end

  def thumbnail
    haml :thumbnail
  end

  def thumbnail_image_view
    voo.show?(:thumbnail_link) ? :boxed_link : :boxed
  end

  def thumbnail_image_size
    voo.size.present? ? voo.size : :small
  end

  def thumbnail_title
    voo.show :title_link if voo.show? :thumbnail_link
    render_title
  end

  # for override
  def thumbnail_subtitle
    ""
  end
end

format :json do
  view :select2_option, cache: :never do
    super().merge html: card.format(:html).render_thumbnail
  end
end
