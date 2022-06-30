// compact_filter.js.coffee
(function(){decko.compactFilter=function(t){var i;return i=$(t).closest("._compact-filter"),this.widget=i.length?i:$(t).closest("._filtered-content").find("._compact-filter"),this.form=this.widget.find("._compact-filter-form"),this.quickFilter=this.widget.find("._quick-filter"),this.activeContainer=this.widget.find("._filter-container"),this.dropdown=this.widget.find("._add-filter-dropdown"),this.dropdownItems=this.widget.find("._filter-category-select"),this.showWithStatus=function(t){var i;return i=this,$.each(this.dropdownItems,function(){var e;if((e=$(this)).data(t))return i.activate(e.data("category"))})},this.reset=function(){return this.restrict(this.form.find("._reset-filter").data("reset"))},this.clear=function(){return this.dropdownItems.show(),this.activeContainer.find(".input-group").remove()},this.activate=function(t,i){return this.activateField(t,i),this.hideOption(t)},this.showOption=function(t){return this.dropdown.show(),this.option(t).show()},this.hideOption=function(t){if(this.option(t).hide(),this.dropdownItems.length<=this.activeFields().length)return this.dropdown.hide()},this.activeFields=function(){return this.activeContainer.find("._filter-input")},this.option=function(t){return this.dropdownItems.filter("[data-category='"+t+"']")},this.findPrototype=function(t){return this.widget.find("._filter-input-field-prototypes ._filter-input-"+t)},this.activateField=function(t,i){var e;return e=this.findPrototype(t).clone(),this.fieldValue(e,i),this.dropdown.before(e),this.initField(e),e.find("input, select").first().focus()},this.fieldValue=function(t,i){return"object"!=typeof i||Array.isArray(i)?this.simpleFieldValue(t,i):this.compoundFieldValue(t,i)},this.simpleFieldValue=function(t,i){var e;if(e=t.find("input, select"),void 0!==i)return e.val(i)},this.compoundFieldValue=function(t,i){var e,n,r;for(n in r=[],i)e=t.find("#filter_value_"+n),r.push(e.val(i[n]));return r},this.removeField=function(t){return this.activeField(t).remove(),this.showOption(t)},this.initField=function(t){return this.initSelectField(t),decko.initAutoCardPlete(t.find("input"))},this.initSelectField=function(t){return decko.initSelect2(t.find("select"))},this.activeField=function(t){return this.activeContainer.find("._filter-input-"+t)},this.isActive=function(t){return this.activeField(t).length},this.restrict=function(t){var i;for(i in this.clear(),t)this.activateField(i,t[i]);return this.update()},this.addRestrictions=function(t){var i;for(i in t)this.removeField(i),this.activate(i,t[i]);return this.update()},this.removeRestrictions=function(t){var i;for(i in t)this.removeField(i);return this.update()},this.updateUrlBar=function(){},this.update=function(){return this.form.submit(),this.updateQuickLinks(),this.updateUrlBar()},this.updateIfPresent=function(t){var i;if((i=this.activeField(t).find("input, select").val())&&i.length>0)return this.update()},this.updateQuickLinks=function(){var t,i;return i=this,(t=this.quickFilter.find("._compact-filter-link")).addClass("active"),t.each(function(){var t,e,n,r;for(t in r=[],n=(e=$(this)).data("filter"))r.push(i.deactivateQuickLink(e,t,n[t]));return r})},this.deactivateQuickLink=function(t,i,e){var n;return n="._filter-input-"+i,$.map([this.form.find(n+" input, "+n+" select").val()],function(i){if(i=[i].flat(),$.inArray(e,i)>-1)return t.removeClass("active")})},this}}).call(this);
// compact_filter_links.js.coffee
(function(){var t,e,i,r,n;decko.slot.ready(function(t){return t.find("._compact-filter").each(function(){var e;if(t[0]===$(this).slot()[0])return(e=new decko.compactFilter(this)).showWithStatus("active"),e.updateQuickLinks(),e.form.on("submit",function(){return e.updateQuickLinks()})})}),$(window).ready(function(){var c;return $("body").on("click","._filter-category-select",function(e){var i,r;return e.preventDefault(),r=t(this),i=$(this).data("category"),r.activate(i),r.updateIfPresent(i)}),c="._compact-filter-form ._filter-input input:not(.simple-text), ._compact-filter-form ._filter-input select, ._compact-filter-form ._filter-sort",$("body").on("change",c,function(){if(!n(this))return t(this).update()}),$("body").on("click","._delete-filter-input",function(){var e;return(e=t(this)).removeField($(this).closest("._filter-input").data("category")),e.update()}),$("body").on("click","._reset-filter",function(){var e;return(e=t(this)).reset(),e.update()}),$("body").on("click","._filtering ._filterable",function(t){var i;if((i=r(this)).widget.length)return i.restrict(e(this)),t.preventDefault(),t.stopPropagation()}),$("body").on("click","._compact-filter-link",function(e){var r,n,c;return r=t(this),n=(c=$(this)).data("filter"),i(c)?r.removeRestrictions(n):r.addRestrictions(n),e.preventDefault(),e.stopPropagation()})}),t=function(t){return new decko.compactFilter(t)},n=function(t){return $(t).hasClass("select2-search__field")},e=function(t){var e;return(e=$(t)).data("filter")||e.find("._filterable").data("filter")},r=function(e){var i;return i=$(e).closest("._filtering").data("filter-selector"),t(i||this)},i=function(t){return!t.hasClass("active")&&t.closest(".quick-filter").length>0}}).call(this);
// filter_form.js.coffee
(function(){var t,e;decko.filter={refilter:function(r,o){var i;return $.isEmptyObject(o.filter)&&(o.filter="empty"),i=decko.path(r.attr("action")+"?"+$.param(o)),r.slot().slotReload(i),e(r,o),t(r,o)}},$(window).ready(function(){return $("body").on("submit","._filter-form",function(){var t,r;return r=(t=$(this)).serializeArray().filter(function(t){return t.value}),e(t,r)}),$("body").on("click","._show-more-filter-options a",function(t){var e,r;return r=(e=$(this)).closest("._filter-list").find("._more-filter-option"),"show more"===e.text()?(r.show(),e.text("show less")):(r.hide(),e.text("show more")),t.preventDefault()}),$("body").on("click","._filter-closers a",function(t){var e;return e=$(this),decko.filter.refilter(e.closest("form"),e.data()),t.preventDefault()}),$("body").on("show.bs.offcanvas","._offcanvas-filter",function(){var t,e;if(""===(t=$(this).find(".offcanvas-body")).html())return e=decko.path(t.data("path")+"/filter_bars?"+$.param(t.data("query"))),$.get(e,function(e){return t.html(e),t.slot().trigger("decko.slot.ready")})})}),t=function(t,e){var r;return(r=t.closest("._filtered-content").find(".offcanvas-body")).empty(),r.data("query",e)},e=function(t,e){if(!t.closest("._noFilterUrlUpdates")[0])return window.history.pushState("filter","filter","?"+$.param(e))}}).call(this);
// filtered_list.js.coffee
(function(){var t,e;$.extend(decko,{itemAdded:function(t){return $("document").ready(function(){return $("body").on("itemAdded","._filtered-list-item",function(){return t.call(this,$(this))})})},itemsAdded:function(t){return $("document").ready(function(){return $("body").on("itemsAdded",".card-slot",function(){return t.call(this,$(this))})})}}),$(window).ready(function(){return $("body").on("click","._filter-items ._add-selected",function(){return $(this).closest(".modal").modal("hide"),e(this).addSelected()}),$("body").on("click","._select-all",function(){return e(this).selectAll(),$(this).prop("checked",!1)}),$("body").on("click","._deselect-all",function(){return e(this).deselectAll(),$(this).prop("checked",!0)}),$("body").on("click","._filter-items ._unselected input._checkbox-list-checkbox",function(){return e(this).selectAndUpdate(this)}),$("body").on("click","._filter-items ._selected input._checkbox-list-checkbox",function(){return e(this).deselectAndUpdate(this)}),$("body").on("click","._filtered-list-item-delete",function(){return $(this).closest("._filtered-list-item").remove()})}),e=function(e){return new t(e)},t=function(){function t(t){this.box=$(t).closest("._filter-items"),this.bin=this.box.find("._selected-bin"),this.selected_items=this.box.find("._selected-item-list"),this.help_text=this.box.find("._filter-help"),this.addSelectedButton=this.box.find("._add-selected"),this.deselectAllLink=this.box.find("._deselect-all"),this.config=this.box.data()}return t.prototype.selectAll=function(){var t;return t=this,this.box.find("._unselected input._checkbox-list-checkbox").each(function(){return t.select(this)}),this.updateOnSelect()},t.prototype.deselectAll=function(){var t;return t=this,this.box.find("._selected input._checkbox-list-checkbox").each(function(){return t.deselect(this)}),this.updateOnSelect()},t.prototype.select=function(t){var e;return e=(t=$(t)).slot(),this.duplicatesOk()&&e.after(e.clone()),t.prop("checked",!0),this.bin.append(e)},t.prototype.deselect=function(t){return $(t).slot().remove()},t.prototype.selectAndUpdate=function(t){return this.select(t),this.updateOnSelect()},t.prototype.deselectAndUpdate=function(t){return this.deselect(t),this.updateOnSelect()},t.prototype.updateOnSelect=function(){return this.duplicatesOk()||(this.trackSelectedIds(),new decko.compactFilter(this.box.find("._compact-filter")).update(),this.updateUnselectedCount()),this.updateSelectedCount()},t.prototype.sourceSlot=function(){return this.box.slot()},t.prototype.addSelected=function(){var t,e,i,n,r;for((r=this.sourceSlot().find(".submit-button")).attr("disabled",!0),e=0,i=(n=this.selectedIds()).length;e<i;e++)t=n[e],this.addSelectedCard(t);return r.attr("disabled",!1),this.sourceSlot().trigger("itemsAdded")},t.prototype.addSelectedCard=function(t){var e,i;return i=this.sourceSlot(),e=this,$.ajax({url:this.addSelectedUrl(t),async:!1,success:function(t){return e.addItem(i,$(t))},error:function(t,e){return i.notify("error: "+e,"error")}})},t.prototype.addItem=function(t,e){return t.find("._filtered-list").append(e),e.trigger("itemAdded"),!0},t.prototype.addSelectedUrl=function(t){return decko.path("~"+t+"/"+this.config.itemView+"?slot[wrap]="+this.config.itemWrap)},t.prototype.duplicatesOk=function(){return this.config.itemDuplicable},t.prototype.trackSelectedIds=function(){var t;return t=this.prefilteredIds().concat(this.selectedIds()),this.box.find("._not-ids").val(t.toString())},t.prototype.prefilteredIds=function(){return this.prefilteredData("cardId")},t.prototype.prefilteredData=function(t){var e;return e=this.sourceSlot().find(this.box.data("itemSelector")),this.arrayFromField(e,t)},t.prototype.selectedIds=function(){return this.selectedData("cardId")},t.prototype.selectedNames=function(){return this.selectedData("cardName")},t.prototype.selectedData=function(t){return this.arrayFromField(this.bin.children(),t)},t.prototype.arrayFromField=function(t,e){return t.map(function(){return $(this).data(e)}).toArray()},t.prototype.updateUnselectedCount=function(){var t;return t=this.box.find("._search-checkbox-list").children().length,this.box.find("._unselected-items").html(t),this.box.find("._select-all").attr("disabled",t>0)},t.prototype.updateSelectedCount=function(){var t;return t=this.bin.children().length,this.box.find("._selected-items").html(t),this.deselectAllLink.attr("disabled",0===t),this.addSelectedButton.attr("disabled",0===t),this.updateSelectedSectionVisibility(t>0)},t.prototype.updateSelectedSectionVisibility=function(t){return t?(this.selected_items.show(),this.help_text.hide()):(this.selected_items.hide(),this.help_text.show())},t}()}).call(this);
// selectable_filtered_content.js.coffee
(function(){$(window).ready(function(){return $("body").on("ajax:beforeSend","._selectable-filter-link",function(e,t,n){return n.noSlotParams=!0}),$("body").on("ajax:success","._selectable-filter-link",function(){return $("._selectable-filtered-content").data("source-link",$(this))}),$("body").on("click","._selectable-filtered-content .search-result-item",function(e){var t;return(t=$(this)).closest("._selectable-filtered-content").data("source-link").trigger("decko.filter.selection",t),t.closest(".modal").modal("hide"),e.preventDefault(),e.stopPropagation()})})}).call(this);