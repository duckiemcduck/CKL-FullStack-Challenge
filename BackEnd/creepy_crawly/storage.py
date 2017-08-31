from django.core.files.storage import FileSystemStorage
from django.conf import settings
import os
import re
#https://stackoverflow.com/questions/9522759/imagefield-overwrite-image-file-with-same-name
class OverwriteStorage(FileSystemStorage):
    def get_available_name(self, name, max_length=None):
        """authorPattern = re.compile("^((.*)(/media/authors/default-author.png))")
        heroPattern = re.compile("^((.*)(/media/authors/default-hero.png))")
        if authorPattern.match(name) is not True:
             if heroPattern.match(name) is not True:
                return self.delete(name)
             else:
                self.delete(heroPattern.match(name).group(1))
                return heroPattern.match(name).group(1)
        else:
            self.delete(authorPattern.match(name).group(1))
            return authorPattern.match(name).group(1)"""
        self.delete(name)
        return name