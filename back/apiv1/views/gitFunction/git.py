import os
import git
import subprocess
from typing import List

from django.conf import settings


def make_remote_repo(userName: str, post_title: str) -> None:
    # back/config/media/
    if not os.path.exists("remote_repo"):
        os.makedirs("remote_repo")
    os.chdir("remote_repo")

    if not os.path.exists(userName):
        os.makedirs(userName)
    os.chdir(userName)

    if not os.path.exists(post_title):
        os.makedirs(post_title)
    os.chdir(post_title)
    git.Repo.init(bare=True, shared=True)


def gitInit(userName: str, post_title: str, post_content: str) -> None:
    # back/config/media/
    os.chdir(settings.MEDIA_ROOT)

    # back/config/media/
    make_remote_repo(userName, post_title)
    os.chdir(settings.MEDIA_ROOT)
    pwd = os.getcwd()
    remoteUrl = f"{pwd}/remote_repo/{userName}/{post_title}"

    if not os.path.exists(userName):
        os.makedirs(userName)
    os.chdir(userName)

    if not os.path.exists(post_title):
        os.makedirs(post_title)
    os.chdir(post_title)

    git.Repo.init()
    repo = git.Repo()

    try:
        repo.create_remote("origin", url=remoteUrl)
    except git.exc.GitCommandError as error:
        print(f"Error creating remote: {error}")

    with open(f"{post_title}.md", "w") as f:
        f.write(post_content)

    repo.index.add(f"{post_title}.md")
    repo.index.commit("Initial commit.")
    # # Pull from remote repo
    # print(repo.remotes.origin.pull())
    # Push changes
    # repo.remotes.origin.push(refspec="main:origin")
    subprocess.run(["git", "fetch"])
    subprocess.run(["git", "merge", "--allow-unrelated-histories", "origin/main"])


def gitPush(userName: str, post_title: str, post_content: str) -> None:
    # back/config/media/
    os.chdir(settings.MEDIA_ROOT)

    # back/config/media/
    pwd = os.getcwd()
    remoteUrl = f"{pwd}/remote_repo/{userName}/{post_title}"

    # if not os.path.exists(userName):  # ディレクトリが存在するか確認
    #     os.makedirs(userName)  # ディレクトリ作成
    os.chdir(userName)

    # if not os.path.exists(post_title):  # ディレクトリが存在するか確認
    #     os.makedirs(post_title)  # ディレクトリ作成
    os.chdir(post_title)

    git.Repo.init()
    repo = git.Repo()

    try:
        repo.create_remote("origin", url=remoteUrl)
    except git.exc.GitCommandError as error:
        print(f"Error creating remote: {error}")

    with open(f"{post_title}.md", "w") as f:
        f.write(post_content)

    repo.index.add(f"{post_title}.md")
    repo.index.commit("commit")
    # # Pull from remote repo
    # print(repo.remotes.origin.pull())
    # Push changes
    # repo.remotes.origin.push(refspec="main:origin")
    repo.remotes.origin.push("main")
    # subprocess.run(["git", "fetch"])
    # subprocess.run(["git", "merge", "--allow-unrelated-histories", "origin/main"])


def getPostLog(userName: str, post_title: str) -> List[str]:
    os.chdir(settings.MEDIA_ROOT)

    # back/config/media/
    # pwd = os.getcwd()
    # remoteUrl = f"{pwd}/remote_repo/{userName}/{post_title}"
    os.chdir(userName)
    os.chdir(post_title)
    r = git.Repo()
    # print(r.git.log(p=True,pretty=format:"%H"))
    # print(r.git.log('--pretty=format:%h -- master'))
    # gitLogList = splitLines(r.git.log('--pretty=format:%h'))
    log = r.git.log("--pretty=format:%h")
    gitLogList = log.splitlines()
    os.chdir(settings.MEDIA_ROOT)
    return gitLogList


def cloneOriginalPost(originUser: str, post_title: str, forkUser: str) -> None:
    os.chdir(settings.MEDIA_ROOT)
    # back/config/media/
    pwd = os.getcwd()

    os.chdir(forkUser)
    to_path = "post_title"

    remoteOriginUrl = f"{pwd}/remote_repo/{originUser}/{post_title}"
    r = git.Repo()
    # repo.clone(url,to_path)
    # repo = git.Repo()
    # repo.clone(url)
    git.Repo.clone_from(remoteOriginUrl, to_path)
    # TODO