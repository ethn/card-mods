basket[:list_input_options] << "prosemirror editor"
basket[:script_config][:prose_mirror] = "setProseMirrorConfig"

format :html do
  def prosemirror_editor_input
    wrap_with :div, id: unique_id, class: "prosemirror-editor" do
      hidden_field :content, class: "d0-card-content", value: card.content
    end
  end
end
