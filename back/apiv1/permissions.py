from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    オブジェクトの所有者にのみ編集を許可するカスタムパーミッション
    """

    def has_object_permission(self, request, view, obj):
        # 読み取りパーミッションはどのようなリクエストにも許可
        # 常にGET、HEAD、OPTIONSのリクエストを許可
        if request.method in permissions.SAFE_METHODS:
            return True

        # 書き込み権限は、スニペットの所有者のみ
        return obj.owner == request.user