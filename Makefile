sitefolder = _site

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
	@git st
	@git add .
	@git ci -m "Update blogpost."
	@git push origin master
	@ghp-import ${sitefolder}
	@git push origin gh-pages
clean:
	@rm -fr ${sitefolder}
drafts:
	@grep "^\- status: draft" content/post/*/*.md -b
