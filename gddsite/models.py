from django.contrib.auth.models import User

class Story(models.Model):
    name = models.CharField(max_length=60)
    created = models.DateTimeField(auto_now_add=True)
    
class StoryAdmin(admin.ModelAdmin):
    list_display = ["name", "created"]
    search_fields = ["name"]

admin.site.register(Story, StoryAdmin);