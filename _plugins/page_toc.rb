require "nokogiri"

module Jekyll
  class PageTocTag < Liquid::Tag

    def initialize(tag_name, markdown, options)
      super
    end

    def render(context)
      content = context['page']['content']
      html = ['<nav v-scrollspy:scrollspy-content="{offset: 64}" class="syn-width-full syn-mt-4">']
      html << '<ul class="syn-width-full syn-overflow-hidden-x syn-scrollable-y">'
      doc = Nokogiri::HTML(content)
      doc.css('h2').each do |heading|
        html << "<li class=\"toc-nav-li syn-overflow-hidden allow-wrap\">
          <a class=\"toc-nav-link flex-item-no-shrink syn-flex justify-space-between align-center syn-text-secondary\" href=\"\##{heading["id"]}\">
            <div class=\"toc-nav-item syn-ml-#{context['toc_indent']}\">#{heading.text}</div>
          </a>
        </li>"
      end
      html << '</ul>'
      html << '</nav>'
      if html.length > 4
        return html.join("\n")
      else
        return ""
      end
    end
  end
end

Liquid::Template.register_tag('pagetoc', Jekyll::PageTocTag)
