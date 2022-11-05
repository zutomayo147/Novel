import os
import subprocess


print(1)
current = os.getcwd()
print(current)
os.chdir('..')
print(os.getcwd())

# subprocess.run("mkdir pp",shell=True)
subprocess.run("mkdir novel",shell=True)
os.chdir(os.path.join(os.getcwd(),'novel'))
print(os.getcwd())


# subprocess.run("git init",shell=True)
subprocess.run("git add.",shell=True)


## initial repo