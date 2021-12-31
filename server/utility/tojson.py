block = ["query", "query_class", "registry"]


def deleteNotUsingKeys(arr):
    for key in arr.keys():
        if key in block:
            del arr[key]
