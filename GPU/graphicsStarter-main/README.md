# Start Code for Rendering

## java

To run the java code, run:

```javac starter.java && java starter```

## html/javascript

To run the html code, you need to start a server. One common way to do this with python is:

```py -m http.server```

See this [MDN page](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server) for more details.

In class we will use VS Code and the LiveServer extension.

# python

In order to use the python code provided, you must install the Pillow module:

```
py -m pip install --upgrade pip && py -m pip install --upgrade Pillow 
```

Then run the code with python

```
py starter.py
```
# C\#

In order to use the C\# code provided, you must have at least .NET 6 SDK installed. You also need to add package System.Drawing.Common:

```dotnet add package System.Drawing.Common```

In order to run the program, use the following commands:

``` dotnet build```

``` dotnet run```

Note that some of this code may not work on all operating systems.

# List of Files

|File|Description|
|---|---|
|.gitignore| A file that enumerates which files should not be tracking by a git code versioning system.|
| bridge.jpg | The example image used in the code. This image is CC0. |
| README.md | This readme file. |
| Sarter.cs | The code for the C\# program. |
| Starter.jsproj | The project definition that is required for the C\# program. |
| starter.html | The code for the html/javascript program. |
| starter.java | The code for the java program. | 
| starter.py | The code for the python program. |
