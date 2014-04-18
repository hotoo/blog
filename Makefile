sitefolder = ~/Sites/blog.hotoo.me/

help:
	@echo 'make post name=blog-file-name'
	@echo 'make watch'
	@echo 'make build'
	@echo 'make publish'
	@echo 'make drafts'
post:
	@cp content/post/drafts/template.md content/post/drafts/$(name).md
	@gvim content/post/drafts/$(name).md
watch:
	@nico server --watch
build:
	@nico build
publish: clean build
	@cd ${sitefolder}; git add .
	@cd ${sitefolder}; git ci -m "U: update blogpost."
	@cd ${sitefolder}; git push origin gh-pages
	#@ghp-import _site
	#@git push origin gh-pages
clean:
	@rm -fr _site
drafts:
	@grep "^\- status: draft" content/post/*/*.md -b
